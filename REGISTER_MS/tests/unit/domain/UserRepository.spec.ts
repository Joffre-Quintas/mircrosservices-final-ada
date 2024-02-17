// create tests for the UserRepository

import { TCreateUserDTO, TUser } from '../../../src/domain/models/UserTypes'
import { UserRepository } from '../../../src/domain/repository/UserRepository'
import { PrismaUserRepository } from '../../../src/adapters/repository/PrismaUserRepository'
import { UserNotFoundException } from '../../../src/domain/exceptions'

function mockDBResponse(): TUser {
  return {
    city: 'Wall Maria',
    country: 'Marley',
    cpf: '12345678901',
    email: 'tita@eren.yeager',
    id: '1',
    name: 'Eren Yeager',
    neighborhood: 'Shiganshina',
    password: 'hash',
    state: 'Paradis Island',
    streetNumber: 1,
    createdAt: '2024-02-16T05:10:06.945Z' as unknown as Date,
    updatedAt: '2024-02-16T05:10:06.945Z' as unknown as Date
  }
}

function mockDBRequest(): TCreateUserDTO {
  const { name, email, cpf, city, country, neighborhood, password, state, streetNumber } = mockDBResponse()
  return {
    name,
    email,
    cpf,
    city,
    country,
    neighborhood,
    password,
    state,
    streetNumber,
    confirmPassword: password
  }
}

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn(() => ({
      users: {
        create: jest.fn().mockReturnValue(mockDBResponse()),
        findUnique: jest.fn().mockReturnValue(mockDBResponse()),
        deleteMany: jest.fn().mockReturnValue(true)
      }
    }))
  }
})

const prismaUserRepository = new PrismaUserRepository()
const userRepository = new UserRepository(prismaUserRepository)

describe('UserRepository', () => {
  describe('success cases', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should create a user', async () => {
      jest.spyOn(prismaUserRepository, 'findByCPF').mockReturnValue(Promise.resolve(false))
      jest.spyOn(prismaUserRepository, 'findByEmail').mockReturnValue(Promise.resolve(false))

      const user = await userRepository.createUser(mockDBRequest())

      expect(user).toEqual(mockDBResponse())
    })

    it('should find a user by cpf', async () => {
      jest.spyOn(prismaUserRepository, 'findByCPF').mockReturnValue(Promise.resolve(mockDBResponse()))

      const user = await userRepository.findByCPF(mockDBRequest().cpf)
      expect(user).toEqual(mockDBResponse())
    })

    it('should find a user by email', async () => {
      jest.spyOn(prismaUserRepository, 'findByEmail').mockReturnValue(Promise.resolve(mockDBResponse()))

      const user = await userRepository.findByEmail(mockDBRequest().email)
      expect(user).toEqual(mockDBResponse())
    })

    it('should delete all users', async () => {
      const response = await userRepository.deleteAllUsers()
      expect(response).toEqual(undefined)
    })
  })

  describe('error cases', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should throw an error when trying to create a user that already exists', async () => {
      jest.spyOn(prismaUserRepository, 'findByCPF').mockReturnValue(Promise.resolve(mockDBResponse()))
      jest.spyOn(prismaUserRepository, 'findByEmail').mockReturnValue(Promise.resolve(false))
      await expect(userRepository.createUser(mockDBRequest())).rejects.toThrow('CPF is already in use')


      jest.spyOn(prismaUserRepository, 'findByEmail').mockReturnValue(Promise.resolve(mockDBResponse()))
      await expect(userRepository.createUser(mockDBRequest())).rejects.toThrow('CPF and Email are already in use')
    })

    it('should throw an error when finding a user by cpf that does not exist', async () => {
      jest.spyOn(prismaUserRepository, 'findByCPF').mockReturnValue(Promise.resolve(false))

      await expect(userRepository.findByCPF(mockDBRequest().cpf)).rejects.toThrow(UserNotFoundException)
    })

    it('should throw an error when finding a user by email that does not exist', async () => {
      jest.spyOn(prismaUserRepository, 'findByEmail').mockReturnValue(Promise.resolve(false))

      await expect(userRepository.findByEmail(mockDBRequest().email)).rejects.toThrow(UserNotFoundException)
    })

    it('should throw an error if doesnot delete all users', async () => {
      jest
        .spyOn(prismaUserRepository, 'deleteAllUsers')
        .mockReturnValue(Promise.reject(new Error('Error deleting all users')))

      await expect(userRepository.deleteAllUsers()).rejects.toThrow()
    })
  })
})
