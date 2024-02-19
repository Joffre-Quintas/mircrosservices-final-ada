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
    this.channel.publish(exchange!, routingKey!, Buffer.from(message!))
  }
}
