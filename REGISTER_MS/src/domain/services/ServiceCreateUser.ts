import {
  IQueueService,
  IServiceCreateUser,
  IRepository,
  TCreateUserDTO,
  TCreateUserResponse,
  TUser,
  TqueueDTO
} from '../models/UserTypes'
import bcrypt from 'bcrypt'

export class ServiceCreateUser implements IServiceCreateUser {
  private Repository: IRepository
  private queueService: IQueueService

  constructor(Repository: IRepository, queueService: IQueueService) {
    this.Repository = Repository
    this.queueService = queueService
  }

  public async execute(data: TCreateUserDTO): Promise<TCreateUserResponse> {
    console.log('ServiceCreateUser.execute -> creating')

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!))
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const newUser: TUser = await this.Repository.createUser({ ...data, password: hashedPassword })

    const transformedUser: TCreateUserResponse = {
      message: 'Successfully created user'
    }
    console.log('ServiceCreateUser.execute -> created')

    console.log('ServiceCreateUser.execute -> publishing to queue')
    const queueData: TqueueDTO = {
      exchange: process.env.RABBITMQ_EXCHANGE,
      routingKey: process.env.RABBITMQ_ROUTING_KEY,
      message: JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        message: 'Successfully created user'
      })
    }
    await this.queueService.publish(queueData)
    console.log('ServiceCreateUser.execute -> published to queue')

    return transformedUser
  }
}
