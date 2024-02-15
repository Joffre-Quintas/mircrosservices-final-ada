import { PrismaUserRepository, UserRepository } from "../adapters/repository";
import { ServiceCreateUser, ServiceDeleteAllUsers } from "../adapters/services";
import { HandlerCreateUser, HandlerDeleteAllUsers } from "../adapters/handlers";
import { IUserRepository, IServiceCreateUser, IServiceDeleteAllUsers } from "../models/UserTypes";

export class Singleton {
  private static instance: Singleton;
  public userRepository: IUserRepository;
  public serviceCreateUser: IServiceCreateUser;
  public serviceDeleteAllUsers: IServiceDeleteAllUsers;
  public handlerCreateUser: HandlerCreateUser;
  public handlerDeleteAllUsers: HandlerDeleteAllUsers;

  private constructor() {
    const prismaUserRepository = new PrismaUserRepository();
    this.userRepository = new UserRepository(prismaUserRepository);
    this.serviceCreateUser = new ServiceCreateUser(this.userRepository);
    this.serviceDeleteAllUsers = new ServiceDeleteAllUsers(this.userRepository);
    this.handlerCreateUser = new HandlerCreateUser(this.serviceCreateUser);
    this.handlerDeleteAllUsers = new HandlerDeleteAllUsers(this.serviceDeleteAllUsers);
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
