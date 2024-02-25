import { IQueueService, IServiceCreateUser, IRepository, TCreateUserDTO, TUser, TqueueDTO } from '../models/UserTypes'
import bcrypt from 'bcrypt'

export class ServiceCreateUser implements IServiceCreateUser {
  private Repository: IRepository
  private queueService: IQueueService

  constructor(Repository: IRepository, queueService: IQueueService) {
    this.Repository = Repository
    this.queueService = queueService
  }

  public async execute(data: TCreateUserDTO): Promise<TUser> {
    console.log('ServiceCreateUser.execute -> creating')

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!))
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const newUser: TUser = await this.Repository.createUser({ ...data, password: hashedPassword })

    console.log('ServiceCreateUser.execute -> created')

    const queueData: TqueueDTO = {
      queue: process.env.RABBITMQ_QUEUE!,
      message: {
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        queue: 'register'
      }
    }
    this.queueService.publish(queueData)

    return newUser
  }
}
