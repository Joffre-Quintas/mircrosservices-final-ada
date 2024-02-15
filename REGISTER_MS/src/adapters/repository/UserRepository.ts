import { PrismaClient } from '@prisma/client'
import { UserNotFoundException } from '../exceptions/Exceptions'
import { TUser, TCreateUserDTO, IUserRepository } from '../../models/UserTypes'

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    const user = {
      ...data
    }
    console.log('UserRepository.createUser -> creating user:', user)

    const dbResponse = await this.prisma.users.create({
      data: {
        ...user
      }
    })

    if (dbResponse) {
      console.log('UserRepository.createUser -> created user:', dbResponse.id)
      return dbResponse
    }
    console.log('UserRepository.createUser -> error')
    throw dbResponse
  }

  public async findByCPF(cpf: string): Promise<TUser> {
    const user = await this.prisma.users.findUnique({ where: { cpf: cpf } })

    if (!user) throw new UserNotFoundException()

    return user
  }

  public async deleteAllUsers(): Promise<void> {
    await this.prisma.users.deleteMany()
  }
}
