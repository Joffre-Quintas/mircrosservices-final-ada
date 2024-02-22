import { Request, Response } from 'express'
import 'dotenv/config'
import { IServiceDeleteAllUsers } from '../../domain/models/UserTypes'
import { UserException, ServerErrorException } from '../../domain/exceptions'

export class HandlerDeleteAllUsers {
  private ServiceDeleteAllUsers: IServiceDeleteAllUsers

  constructor(ServiceDeleteAllUsers: IServiceDeleteAllUsers) {
    this.ServiceDeleteAllUsers = ServiceDeleteAllUsers
  }

  public execute = async (req: Request, res: Response) => {
    try {
      await this.ServiceDeleteAllUsers.execute()

      res.status(204).json()
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
