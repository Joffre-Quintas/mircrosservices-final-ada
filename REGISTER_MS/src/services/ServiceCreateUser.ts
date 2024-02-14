import { IUserRepository, TUserData } from '../models/UserTypes'

export class ServiceCreateUser {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute(data: TUserData): Promise<TUserData> {
    try {
      const newUser = await this.userRepository.createUser(data)

      const keysToReturn = ['name', 'email', 'cpf', 'streetNumber', 'neighborhood', 'city', 'state', 'country']
      const transformedUser: TUserData = Object.assign(
        Object.entries(newUser).reduce((acc, [key, value]) => {
          if (!keysToReturn.includes(key)) {
            return acc
          }
          return { ...acc, [key]: value }
        })
      )

      return transformedUser
    } catch (error: unknown) {
      return Promise.reject(error)
    }
  }
}
