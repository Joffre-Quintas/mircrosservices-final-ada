import { Request, Response } from 'express'
import { ServiceCreateUser } from '../services/ServiceCreateUser'
import { UserRepository } from '../repository/UserRepository'
import HandlerCreateUser from '../handlers/HandlerCreateUser'

const userRepositoy = new UserRepository()
const serviceCreateUser = new ServiceCreateUser(userRepositoy)
const handlerCreateUser = new HandlerCreateUser(serviceCreateUser)

export class AplicationController {
  static createUser = (req: Request, res: Response) => {
    console.log('AplicationController.createUser -> req')
    handlerCreateUser.execute(req, res)
  }
}
