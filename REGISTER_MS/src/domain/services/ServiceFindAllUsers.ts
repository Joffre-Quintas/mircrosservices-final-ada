import { IServiceFindAllUsers, IRepository, TFindAllUsersResponse } from "../models/UserTypes"

export class ServiceFindAllUsers implements IServiceFindAllUsers {
  private Repository: IRepository

  constructor(Repository: IRepository) {
    this.Repository = Repository
  }

  public async execute(): Promise<TFindAllUsersResponse> {
    console.log('ServiceFindAllUsers.execute -> Finding all users')

    const dbResponse = await this.Repository.findAllUsers()
    dbResponse

const transformedResponse: TFindAllUsersResponse = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data: dbResponse.map(({ password, addressId, ...rest }) => rest)
}

    
    console.log('ServiceFindAllUsers.execute -> Found all users')
    return transformedResponse
  }
}
