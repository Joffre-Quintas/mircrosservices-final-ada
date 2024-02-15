import { Request, Response } from 'express'
import 'dotenv/config'
import { IServiceCreateUser, TCreateUserDTO } from '../../models/UserTypes'
import { UserException, ServerErrorException } from '../exceptions'

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
        return res.status(status).json({ data: { status, message, name } })
      } else if (error instanceof Error) {
        console.log('HandlerCreateUser -> error', error)
        const serverError = new ServerErrorException()
        return res.status(serverError.status).json({ data: error.name ?? serverError.message })
      }
    }
  }
}
