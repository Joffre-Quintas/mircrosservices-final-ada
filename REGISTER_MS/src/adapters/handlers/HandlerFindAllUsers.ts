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
        return res.status(status).json({ status, message, name })
      }

      const serverError = new ServerErrorException()
      return res.status(serverError.status).json(error ?? serverError)
    }
  }
}
