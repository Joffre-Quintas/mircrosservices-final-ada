import { IServiceDeleteAllUsers, IUserRepository } from '../../models/UserTypes'

export class ServiceDeleteAllUsers implements IServiceDeleteAllUsers {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public async execute(): Promise<void> {
    console.log('ServiceDeleteAllUsers.execute -> deleteAllUsers')

    await this.userRepository.deleteAllUsers()
  }
}
