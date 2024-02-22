import { TCreateUserDTO, TUser } from '../../../src/domain/models/UserTypes'
import { Singleton } from '../../../src/singletons'

function mockDBResponse(): TUser {
  return {
    addressId: '1',
    address: {
      id: '1',
      street: 'Wall Maria',
      number: '1',
      neighborhood: 'Shiganshina',
      city: 'Maria',
      state: 'Paradis',
      country: 'Japan',
      cep: '12345678',
      complement: 'House 1'
    },
    cpf: '12345678901',
    email: 'tita@eren.yeager',
    id: '1',
    name: 'Eren Yeager',
    password: 'hash',
    createdAt: '2024-02-16T05:10:06.945Z' as unknown as Date,
    updatedAt: '2024-02-16T05:10:06.945Z' as unknown as Date
  }
}

function mockDBRequest(): TCreateUserDTO {
  const { name, email, cpf, password, addressId } = mockDBResponse()
  return {
    name,
    email,
    cpf,
    password,
    confirmPassword: password,
    addressId
  }
}

const Repository = Singleton.getInstance().Repository

describe('Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a user', async () => {
    jest.spyOn(Repository, 'createUser').mockResolvedValue(mockDBResponse())

    const user = await Repository.createUser(mockDBRequest())

    expect(user).toEqual(mockDBResponse())
  })

  it('should find a user by cpf', async () => {
    jest.spyOn(Repository, 'findUserByCPF').mockResolvedValue(mockDBResponse())

    const user = await Repository.findUserByCPF(mockDBRequest().cpf)
    expect(user).toEqual(mockDBResponse())
  })

  it('should find a user by email', async () => {
    jest.spyOn(Repository, 'findUserByEmail').mockResolvedValue(mockDBResponse())

    const user = await Repository.findUserByEmail(mockDBRequest().email)
    expect(user).toEqual(mockDBResponse())
  })

  it('should find all users', async () => {
    jest.spyOn(Repository, 'findAllUsers').mockResolvedValue([mockDBResponse()])

    const users = await Repository.findAllUsers()
    expect(users).toEqual([mockDBResponse()])
  })

  it('should delete all users', async () => {
    jest.spyOn(Repository, 'deleteAllUsers').mockResolvedValue(undefined)

    const response = await Repository.deleteAllUsers()
    expect(response).toEqual(undefined)
  })
})
