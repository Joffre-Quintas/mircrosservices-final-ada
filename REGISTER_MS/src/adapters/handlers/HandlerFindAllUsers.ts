import { Request, Response } from 'express'
import 'dotenv/config'
import { IServiceFindAllUsers } from '../../domain/models/UserTypes'
import { UserException, ServerErrorException } from '../../domain/exceptions'

export class HandlerFindAllUsers {
  private ServiceFindAllUsers: IServiceFindAllUsers

  constructor(ServiceFindAllUsers: IServiceFindAllUsers) {
    this.ServiceFindAllUsers = ServiceFindAllUsers
  }

  public execute = async (req: Request, res: Response) => {
    try {
      const response = await this.ServiceFindAllUsers.execute()

      res.status(200).json(response)
    } catch (error) {
      if (error instanceof UserException) {
        const { message, status, name } = error
        return res.status(status).json({ data: { status, message, name } })
      } else if (error instanceof Error) {
        const serverError = new ServerErrorException()
        const data = error['message']
          ? {
              status: serverError.status,
              message: error.message,
              name: serverError.name
            }
          : serverError

        return res.status(serverError.status).json(data)
      }
    }
  }
}
