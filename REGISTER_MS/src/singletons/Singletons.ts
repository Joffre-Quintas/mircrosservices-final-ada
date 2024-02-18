import { ServiceCreateUser, ServiceDeleteAllUsers } from '../domain/services'
import { HandlerCreateUser, HandlerDeleteAllUsers } from '../adapters/handlers'
import {
  IRepository,
  IServiceCreateUser,
  IServiceDeleteAllUsers,
  IServiceFindAllUsers
} from '../domain/models/UserTypes'
import { Repository } from '../adapters/repository'
import { RabbitMQueueService } from '../adapters/services'
import { ServiceFindAllUsers } from '../domain/services/ServiceFindAllUsers'
import { HandlerFindAllUsers } from '../adapters/handlers/HandlerFindAllUsers'

export class Singleton {
  public static instance: Singleton
  public queueService: RabbitMQueueService
  public Repository: IRepository

  public ServiceCreateUser: IServiceCreateUser
  public ServiceFindAllUsers: IServiceFindAllUsers
  public ServiceDeleteAllUsers: IServiceDeleteAllUsers

  public HandlerCreateUser: HandlerCreateUser
  public HandlerDeleteAllUsers: HandlerDeleteAllUsers
  public HandlerFindAllUsers: HandlerFindAllUsers

  private constructor() {
    this.queueService = new RabbitMQueueService()
    this.Repository = new Repository()

    this.ServiceCreateUser = new ServiceCreateUser(this.Repository, this.queueService)
    this.ServiceFindAllUsers = new ServiceFindAllUsers(this.Repository)
    this.ServiceDeleteAllUsers = new ServiceDeleteAllUsers(this.Repository)

    this.HandlerCreateUser = new HandlerCreateUser(this.ServiceCreateUser)
    this.HandlerDeleteAllUsers = new HandlerDeleteAllUsers(this.ServiceDeleteAllUsers)
    this.HandlerFindAllUsers = new HandlerFindAllUsers(this.ServiceFindAllUsers)
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }
    return Singleton.instance
  }
}
