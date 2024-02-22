import 'dotenv/config'
import request from 'supertest'
import app from '../../src/app'
import { Repository } from '../../src/adapters/repository'

enum EHttpStatus {
  SUCCESS = 200,
  SERVER_ERROR = 500
}

const reqMock = {
  data: {
    rootSecret: process.env.ROOT_SECRET
  }
}

describe('FindAll User Flux', () => {
  it(`should find all users and return status "${EHttpStatus.SUCCESS}"`, async () => {
    const res = await request(app).get('/find-all-users').send(reqMock)

    console.log(res.body)

    expect(res.status).toBe(EHttpStatus.SUCCESS)
    expect(res.body).toBeInstanceOf(Object)
  })

  it(`should return a "${EHttpStatus.SERVER_ERROR}" status code if any error occurs`, async () => {
    jest.spyOn(Repository.prototype, 'findAllUsers').mockRejectedValue(new Error('Server is down'))
    const res = await request(app).get('/find-all-users').send(reqMock)

    expect(res.status).toBe(EHttpStatus.SERVER_ERROR)
    expect(res.body).toHaveProperty('message')
  })
})
