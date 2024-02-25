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
      const data: TCreateUserDTO = req.body
      delete data.confirmPassword

      const response = await this.ServiceCreateUser.execute(data)

      res.status(201).json(response && 'Success create user!')
    } catch (error) {
      if (error instanceof UserException) {
        const { message, status, name } = error
        return res.status(status).json({ data: { status, message, name } })
      } else if (error instanceof Error) {
        const serverError = new ServerErrorException()
        return error.message
          ? res.status(serverError.status).json({
              data: {
                status: serverError.status,
                message: error.message,
                name: serverError.name
              }
            })
          : res.status(serverError.status).json({ data: serverError })
      }
    }
  }
}
