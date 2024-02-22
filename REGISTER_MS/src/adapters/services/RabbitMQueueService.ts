import { IQueueService, TqueueDTO } from '../../domain/models'
import { Channel, connect, Connection } from 'amqplib'

export class RabbitMQueueService implements IQueueService {
  static instance: RabbitMQueueService = new RabbitMQueueService()

  private connection!: Connection
  private channel!: Channel

  private async init() {
    if (!this.connection) {
      try {
        this.connection = await connect({
          hostname: process.env.RABBITMQ_HOSTNAME,
          username: process.env.RABBITMQ_USERNAME,
          password: process.env.RABBITMQ_PASSWORD,
          vhost: process.env.RABBITMQ_VHOST,
          port: parseInt(process.env.RABBITMQ_PORT!)
        })

        this.channel = await this.connection.createChannel()
        console.log('RabbitMQueueService.init -> connected')
        return true
      } catch (error) {
        console.log('RabbitMQueueService.init ->', error)
        return false
      }
    }
    return true
  }

  public async publish(data: TqueueDTO): Promise<void> {
    console.log('RabbitMQueueService.publish -> publishing')
    if (!(await this.init())) {
      return
    }

    const { queue, message } = data

    this.channel.assertQueue(queue, { durable: true })
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    console.log('RabbitMQueueService.publish -> published')
  }
}
