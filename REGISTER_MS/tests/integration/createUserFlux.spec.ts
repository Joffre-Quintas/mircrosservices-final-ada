import request from 'supertest'
import app from '../../src/app'

import { TCreateUserDTO } from '../../src/domain/models/UserTypes'
import { Singleton } from '../../src/singletons'

function userData(): TCreateUserDTO {
  return {
    name: 'Eren Yeager',
    email: 'tita@eren.yeager',
    cpf: '12345678900',
    streetNumber: 22,
    neighborhood: 'Shiganshina',
    city: 'Maria',
    state: 'Paradis',
    country: 'Japan',
    password: 'O_mundo_e_um_lugar_cruel'
  }
}

const reqMock = {
  body: {
    data: {
      ...userData(),
      confirmPassword: userData().password
    }
  }
}

enum EHttpStatus {
  CREATED = 201,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  SERVER_ERROR = 500
}

describe('Create User Flux', () => {
  beforeAll(async () => {
    await Singleton.getInstance().userRepository.deleteAllUsers()
  })

  it(`should create a user and status "${EHttpStatus.CREATED}"`, async () => {
    const res = await request(app).post('/create-user').send(reqMock.body)

    expect(res.status).toBe(EHttpStatus.CREATED)
    expect(res.body.data).toHaveProperty('createdAt')
  })

  it(`should return a "${EHttpStatus.CONFLICT}" status code if the user already exists`, async () => {
    await request(app).post('/create-user').send(reqMock.body)
    const res = await request(app).post('/create-user').send(reqMock.body)

    expect(res.status).toBe(EHttpStatus.CONFLICT)
    expect(res.body.message).toBe('CPF and Email are already in use')
  })

  it(`should return a "${EHttpStatus.BAD_REQUEST}" status code if any required field is missing`, async () => {
    const res = await request(app)
      .post('/create-user')
      .send({
        data: {
          name: 'Eren Yeager'
        }
      })

    expect(res.status).toBe(EHttpStatus.BAD_REQUEST)
  })

  it(`should return a "${EHttpStatus.BAD_REQUEST}" status code if the password and confirmPassword are different`, async () => {
    const res = await request(app)
      .post('/create-user')
      .send({
        data: {
          ...userData(),
          confirmPassword: 'differentPassword'
        }
      })

    expect(res.status).toBe(EHttpStatus.BAD_REQUEST)
    expect(res.body.message).toBe('Password and Confirm Password must be the same.')
  })

  it(`should return a "${EHttpStatus.SERVER_ERROR}" status code if the server is down`, async () => {
    jest.spyOn(Singleton.getInstance().userRepository, 'createUser').mockRejectedValue(new Error('Server is down'))

    const res = await request(app).post('/create-user').send(reqMock.body)

    expect(res.status).toBe(EHttpStatus.SERVER_ERROR)
    expect(res.body).toHaveProperty('error')
  })
})
