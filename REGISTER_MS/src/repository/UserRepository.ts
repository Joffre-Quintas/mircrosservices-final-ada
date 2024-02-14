import { database } from '../../databaseMock/database'
import { TUser, TUserData } from '../models/UserTypes'
import { IUserRepository } from '../models/UserTypes'

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

  public async createUser(data: TUserData): Promise<TUser> {
    
    const user = {
      id: this.generateId(),
      ...data
    }

    database.users.push(user)
    return Promise.resolve(user)
  }
}
