import { UserAlreadyExistsException } from '../exceptions/Exceptions'
import { IServiceCreateUser, IUserRepository, TCreateUserDTO, TCreateUserResponse, TUser } from '../../models/UserTypes'
import bcrypt from 'bcrypt'

export class ServiceCreateUser implements IServiceCreateUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute(data: TCreateUserDTO): Promise<TCreateUserResponse> {
    console.log('ServiceCreateUser.execute -> creating')

    await this.userRepository.findByCPF(data.cpf).then(
      () => {
        throw new UserAlreadyExistsException()
      },
      () => {}
    )

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS ?? '10'))
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const newUser: TUser = await this.userRepository.createUser({ ...data, password: hashedPassword })
    const transformedUser: TCreateUserResponse = {
      data: {
        name: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
      }
    }

    console.log('ServiceCreateUser.execute -> created')
    return transformedUser
  }
}
