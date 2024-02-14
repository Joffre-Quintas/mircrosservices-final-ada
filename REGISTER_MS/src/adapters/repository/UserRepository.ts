import { database } from '../../../databaseMock/database'
import { UserNotFoundException } from '../exceptions/Exceptions'
import { TUser, TCreateUserDTO, IUserRepository } from '../../models/UserTypes'

// database mock é um banco de dados em memória

export class UserRepository implements IUserRepository {
  private generateId(): string {
    return (
      database.users.reduce((acc, user) => {
        if (parseInt(user.id) > acc) {
          return parseInt(user.id)
        }
        return acc
      }, 0) + 1
    ).toString()
  }

  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    const user = {
      ...data,
      id: this.generateId()
    }

    const dbResponse = database.users.push(user)
    console.log('UserRepository.createUser -> user', user)

    if (dbResponse) return Promise.resolve(user)
    throw dbResponse
  }

  public async findByCPF(cpf: string): Promise<TUser> {
    const user = database.users.find((user) => user.cpf === cpf)

    if (!user) throw new UserNotFoundException()

    return Promise.resolve(user)
  }

  public async deleteAllUsers(): Promise<void> {
    database.users = []
  }
}
