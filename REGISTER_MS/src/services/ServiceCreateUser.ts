import { UserAlreadyExistsException } from '../exceptions/Exceptions'
import { IServiceCreateUser, IUserRepository, TCreateUserDTO, TCreateUserResponse } from '../models/UserTypes'
import bcrypt from 'bcrypt'

export class ServiceCreateUser implements IServiceCreateUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute(data: TCreateUserDTO): Promise<TCreateUserResponse> {
    await this.userRepository.findByCPF(data.cpf).then(
      () => {
        throw new UserAlreadyExistsException()
      },
      () => {}
    )

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS ?? '10'))
    const hashedPassword = await bcrypt.hash(data.password, salt)

    console.log('ServiceCreateUser.execute -> salt', {
      salt,
      hashedPassword
    })

    const newUser = await this.userRepository.createUser({ ...data, password: hashedPassword })
    const transformedUser: TCreateUserResponse = { name: newUser.name, email: newUser.email, cpf: newUser.cpf }

    // console.log('ServiceCreateUser.execute -> transformedUser', transformedUser)
    return transformedUser
  }
}
