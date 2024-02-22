import { PrismaClient } from '@prisma/client'
import { TUser, TCreateUserDTO, IRepository, TAddress } from '../../domain/models/UserTypes'
import { AddressNotFoundException, UserAlreadyExistsException, UserNotFoundException } from '../../domain/exceptions'

export class Repository implements IRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // User Table Methods
  public async createUser(data: TCreateUserDTO): Promise<TUser> {
    // finding existing user
    console.log('Repository.createUser -> finding existing user')
    const ifCPF = await this.findUserByCPF(data.cpf).catch(() => false)
    const ifEmail = await this.findUserByEmail(data.email).catch(() => false)

    if (ifCPF || ifEmail) {
      if (ifCPF && ifEmail) throw new UserAlreadyExistsException('CPF and Email are already in use')

      const message = ifCPF ? 'CPF is already in use' : 'Email is already in use'
      throw new UserAlreadyExistsException(message)
    }
    console.log('Repository.createUser -> existing user not found')

    // validating address
    await this.findAddressById(data.addressId)

    // creating user
    console.log('Repository.createUser -> creating')
    const response = await this.prisma.user.create({ data })
    
    if (!response) {
      throw response
    }
    console.log('Repository.createUser -> created')
    console.log(response)
    return response
  }

  public async findAllUsers(): Promise<TUser[]> {
    console.log('Repository.findAllUsers -> finding')
    const response = await this.prisma.user.findMany({ include: { address: true } })

    if (!response) {
      throw response
    }
    console.log('Repository.findAllUsers -> found')

    console.log(await this.prisma.user.findFirst({ where: { id: '5c61ebdb-5d96-423d-8c89-06688f58e4e5' } }))

    return response
  }

  public async findUserByCPF(cpf: string): Promise<TUser> {
    console.log('Repository.findUserByCPF -> finding')
    const response = await this.prisma.user.findUnique({ where: { cpf: cpf }, include: { address: true } })

    if (!response) {
      throw new UserNotFoundException()
    }
    console.log('Repository.findUserByCPF -> found')
    return response
  }

  public async findUserByEmail(email: string): Promise<TUser> {
    console.log('Repository.findUserByEmail -> finding')
    const response = await this.prisma.user.findUnique({ where: { email: email }, include: { address: true } })

    if (!response) {
      throw new UserNotFoundException()
    }
    console.log('Repository.findUserByEmail -> found')
    return response
  }

  public async deleteAllUsers(): Promise<void> {
    console.log('Repository.deleteAllUsers -> deleting')
    const response = await this.prisma.user.deleteMany()

    if (!response) {
      throw response
    }
    console.log('Repository.deleteAllUsers -> deleted')
    return
  }

  // Address Table Methods
  public async findAddressById(id: string): Promise<TAddress> {
    console.log('Repository.findAddressById -> finding')
    const dbResponse = await this.prisma.address.findUnique({
      where: {
        id: id
      }
    })

    if (!dbResponse) {
      throw new AddressNotFoundException()
    }

    console.log('Repository.findAddressById -> found')
    return dbResponse
  }
}
