import { Request, Response } from 'express'
import 'dotenv/config'
import { IServiceDeleteAllUsers } from '../models/UserTypes'
import { UserException, ServerErrorException } from '../adapters/exceptions'

class HandlerCreateUser {
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
        return res.status(status).json({ status, message, name })
      }

      const serverError = new ServerErrorException()
      return res.status(serverError.status).json(error ?? serverError)
    }
  }
}

export default HandlerCreateUser
