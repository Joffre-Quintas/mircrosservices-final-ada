import { IQueueService, TqueueDTO } from '../../domain/models'
import { Channel, connect, Connection } from 'amqplib'

export class RabbitMQueueService implements IQueueService {
  static instance: RabbitMQueueService = new RabbitMQueueService()

  private connection!: Connection
  private channel!: Channel

  private async init() {
    if (!this.connection) {
      try {
        this.connection = await connect('amqps://pyqsndee:jl6A3s42R8KdwVpsqUT9qONpt9YDkrAO@jackal.rmq.cloudamqp.com/pyqsndee')

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

    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    console.log('RabbitMQueueService.publish -> published')
  }
}
