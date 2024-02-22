import { IServiceDeleteAllUsers, IRepository } from "../models/UserTypes"

export class ServiceDeleteAllUsers implements IServiceDeleteAllUsers {
  private Repository: IRepository

  constructor(Repository: IRepository) {
    this.Repository = Repository
  }

  public async execute(): Promise<void> {
    console.log('ServiceDeleteAllUsers.execute -> deleting')

    await this.Repository.deleteAllUsers()
    
    console.log('ServiceDeleteAllUsers.execute -> deleted')
  }
}
