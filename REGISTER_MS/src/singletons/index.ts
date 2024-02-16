
import { ServiceCreateUser, ServiceDeleteAllUsers } from "../domain/services";
import { HandlerCreateUser, HandlerDeleteAllUsers } from "../adapters/handlers";
import { IUserRepository, IServiceCreateUser, IServiceDeleteAllUsers } from "../domain/models/UserTypes";
import { UserRepository } from "../domain/repository";
import { PrismaUserRepository } from "../adapters/repository";

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
