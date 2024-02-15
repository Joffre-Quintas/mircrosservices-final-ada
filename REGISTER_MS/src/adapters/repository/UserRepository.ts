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
    console.log('UserRepository.createUser -> creating')

    const dbResponse = await this.prisma.users.create({ data })

    if (!dbResponse) {
      throw dbResponse
    }
    console.log('UserRepository.createUser -> created')
    return dbResponse
  }

  public async findByCPF(cpf: string): Promise<TUser> {
    console.log('UserRepository.findByCPF -> finding')
    const dbResponse = await this.prisma.users.findUnique({ where: { cpf: cpf } })

    if (!dbResponse) {
      throw new UserNotFoundException()
    }
    console.log('UserRepository.findByCPF -> found')
    return dbResponse
  }

  public async deleteAllUsers(): Promise<void> {
    console.log('UserRepository.deleteAllUsers -> deleting')
    const dbResponse = await this.prisma.users.deleteMany()

    if (!dbResponse) {
      throw dbResponse
    }
    console.log('UserRepository.deleteAllUsers -> deleted')
    return
  }
}
