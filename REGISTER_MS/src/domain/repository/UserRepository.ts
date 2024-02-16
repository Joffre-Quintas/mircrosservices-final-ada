import { UserAlreadyExistsException, UserNotFoundException } from '../exceptions'
import { TUser, TCreateUserDTO, IUserRepository } from '../models/UserTypes'

export class UserRepository implements IUserRepository {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    console.log('UserRepository.createUser -> finding existing user')
    const user = await this.repository.findByCPF(data.cpf)
    if (user) {
      throw new UserAlreadyExistsException()
    }
    console.log('UserRepository.createUser -> existing user not found')

    console.log('UserRepository.createUser -> creating')
    const response = await this.repository.createUser(data)
    if (!response) {
      throw response
    }
    console.log('UserRepository.createUser -> created')
    return response
  }

  public async findByCPF(cpf: string): Promise<TUser> {
    console.log('UserRepository.findByCPF -> finding')
    const response = await this.repository.findByCPF(cpf)

    if (!response) {
      throw new UserNotFoundException()
    }
    console.log('UserRepository.findByCPF -> found')
    return response
  }

  public async deleteAllUsers(): Promise<void> {
    console.log('UserRepository.deleteAllUsers -> deleting')
    const response = await this.repository.deleteAllUsers()

    if (!response) {
      throw response
    }
    console.log('UserRepository.deleteAllUsers -> deleted')
    return
  }
}
