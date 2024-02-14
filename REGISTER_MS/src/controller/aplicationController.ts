import { Request, Response } from 'express'
import { IServiceCreateUser, IUserRepository } from '../models/UserTypes'
import { IServiceDeleteAllUsers } from '../models/UserTypes'
import { UserRepository } from '../repository/UserRepository'
import HandlerCreateUser from '../handlers/HandlerCreateUser'
import HandlerDeleteAllUsers from '../handlers/HandlerDeleteAllUsers'
import { ServiceCreateUser } from '../services/ServiceCreateUser'
import { ServiceDeleteAllUsers } from '../services/ServiceDeleteAllUsers'

// repository adapters
const userRepositoy: IUserRepository = new UserRepository()

// services adapters
const serviceCreateUser: IServiceCreateUser = new ServiceCreateUser(userRepositoy)
const serviceDeleteAllUsers: IServiceDeleteAllUsers = new ServiceDeleteAllUsers(userRepositoy)

// handlers adapters
const handlerCreateUser = new HandlerCreateUser(serviceCreateUser)
const handlerDeleteAllUsers = new HandlerDeleteAllUsers(serviceDeleteAllUsers)

export class AplicationController {
  static createUser = (req: Request, res: Response) => {
    handlerCreateUser.execute(req, res)
  }

  static deleteAllUsers = async (req: Request, res: Response) => {
    handlerDeleteAllUsers.execute(req, res)
  }
}