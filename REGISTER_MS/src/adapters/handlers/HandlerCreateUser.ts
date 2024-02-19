import { Request, Response } from 'express'
import 'dotenv/config'
import { IServiceCreateUser, TCreateUserDTO } from '../../domain/models/UserTypes'
import { UserException, ServerErrorException } from '../../domain/exceptions'

export class HandlerCreateUser {
  private ServiceCreateUser: IServiceCreateUser

  constructor(ServiceCreateUser: IServiceCreateUser) {
    this.ServiceCreateUser = ServiceCreateUser
  }

  public execute = async (req: Request, res: Response) => {
    try {
      const { data } = req.body as { data: TCreateUserDTO }
      delete data.confirmPassword

      const response = await this.ServiceCreateUser.execute(data)

      res.status(201).json(response)
    } catch (error) {
      if (error instanceof UserException) {
        const { message, status, name } = error
        return res.status(status).json({ status, message, name })
      } else if (error instanceof Error) {
        const serverError = new ServerErrorException()
        return error.message
          ? res.status(serverError.status).json({ error })
          : res.status(serverError.status).json({ serverError })
      }
    }
  }
}