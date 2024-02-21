import { IQueueService, TqueueDTO } from '../../domain/models'
import { Channel, connect, Connection } from 'amqplib'

export class RabbitMQueueService implements IQueueService {
  static instance: RabbitMQueueService = new RabbitMQueueService()

  private connection!: Connection
  private channel!: Channel

  constructor() {
    this.init()
  }

  private async init() {
    this.connection = await connect(process.env.RABBITMQ_URL!)
    this.channel = await this.connection.createChannel()
  }

  public async publish(data: TqueueDTO): Promise<void> {
    const { exchange, routingKey, message } = data

  await this.channel.assertQueue(routingKey!)
    // send to queue
    // queue_name
    
    // JSON.stringify({ userId: user.id, name: user.name, email: user.email, queue:'order' })
    // await this.channel.sendToQueue(routingKey!, Buffer.from(message!))
    this.channel.publish(exchange!, routingKey!, Buffer.from(message!))
  }
}
