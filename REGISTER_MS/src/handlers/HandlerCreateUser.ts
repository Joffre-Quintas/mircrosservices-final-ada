import { Request, Response } from 'express'
import 'dotenv/config'
import { IServiceCreateUser, TUserData } from '../models/UserTypes'

class HandlerCreateUser {
  private ServiceCreateUser: IServiceCreateUser

  constructor(ServiceCreateUser: IServiceCreateUser) {
    this.ServiceCreateUser = ServiceCreateUser
  }

  public execute = async (req: Request, res: Response) => {
    try {
      const { ...data }: TUserData = req.body

      const response = await this.ServiceCreateUser.execute(data)

      res.json(response)
    } catch (error: unknown) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

export default HandlerCreateUser
