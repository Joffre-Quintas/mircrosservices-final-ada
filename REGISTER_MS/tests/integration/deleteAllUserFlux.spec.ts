import 'dotenv/config'
import request from 'supertest'
import app from '../../src/app'
import { Repository } from '../../src/adapters/repository'

const jsonResponse = {}

const reqMock = {
  body: {
    data: {
      rootSecret: process.env.ROOT_SECRET
    }
  }
}

enum EHttpStatus {
  NO_CONTENT = 204,
  SERVER_ERROR = 500
}

describe('DeleteAll User Flux', () => {
  it(`should delete all users from db with error "${EHttpStatus.NO_CONTENT}"`, async () => {
    const res = await request(app).delete('/delete-all-users').send(reqMock.body)

    console.log(res.body)

    expect(res.status).toBe(EHttpStatus.NO_CONTENT)
    expect(res.body).toEqual(jsonResponse)
  })

  it(`should return a "${EHttpStatus.SERVER_ERROR}" status code if any error occurs`, async () => {
    jest.spyOn(Repository.prototype, 'deleteAllUsers').mockRejectedValue(new Error('Server is down'))
    const res = await request(app).delete('/delete-all-users').send(reqMock.body)

    expect(res.status).toBe(EHttpStatus.SERVER_ERROR)
    expect(res.body).toHaveProperty('message')
  })
})
