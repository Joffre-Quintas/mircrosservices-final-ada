import { PrismaClient } from '@prisma/client'
import { UserNotFoundException } from '../exceptions/Exceptions'
import { TUser, TCreateUserDTO, IUserRepository } from '../../models/UserTypes'

export class UserRepository implements IUserRepository {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    return await this.repository.createUser(data)
  }

  public async findByCPF(cpf: string): Promise<TUser> {
    return await this.repository.findByCPF(cpf)
  }

  public async deleteAllUsers(): Promise<void> {
    return await this.repository.deleteAllUsers()
  }
}

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    const dbResponse = await this.prisma.users.create({ data })

    if (dbResponse) {
      console.log('UserRepository.createUser -> created')
      return dbResponse
    }
    console.log('UserRepository.createUser -> error', dbResponse)
    throw dbResponse
  }

  public async findByCPF(cpf: string): Promise<TUser> {
    const dbResponse = await this.prisma.users.findUnique({ where: { cpf: cpf } })

    if (!dbResponse) {
      console.log('UserRepository.findByCPF -> user not found')
      throw new UserNotFoundException()
    }
    console.log('UserRepository.findByCPF -> user found')
    return dbResponse
  }

  public async deleteAllUsers(): Promise<void> {
    const dbResponse = await this.prisma.users.deleteMany()

    if (dbResponse) {
      console.log('UserRepository.deleteAllUsers -> deleted')
      return
    }
    console.log('UserRepository.deleteAllUsers -> error', dbResponse)
    throw dbResponse
  }
}
