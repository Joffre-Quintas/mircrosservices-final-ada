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

    console.log('ServiceCreateUser.execute -> created')

    const queueData: TqueueDTO = {
      queue: process.env.RABBITMQ_QUEUE!,
      message: {
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        queue: 'order'
      }
    }
    this.queueService.publish(queueData)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, addressId, id, ...rest } = newUser

    return { data: { ...rest, message: 'User created' } }
  }
}
