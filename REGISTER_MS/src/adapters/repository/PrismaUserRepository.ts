import { PrismaClient } from '@prisma/client'
import { TUser, TCreateUserDTO, IUserRepository } from '../../domain/models/UserTypes'

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    const dbResponse = await this.prisma.users.create({ data })

    return dbResponse
  }

  public async findByCPF(cpf: string): Promise<TUser | false> {
    const dbResponse = await this.prisma.users.findUnique({ where: { cpf: cpf } })

    if (!dbResponse) {
      return false
    }

    return dbResponse
  }

  public async deleteAllUsers(): Promise<boolean> {
    const dbResponse = await this.prisma.users.deleteMany()

    if (!dbResponse) {
      return false
    }

    return true
  }
}
