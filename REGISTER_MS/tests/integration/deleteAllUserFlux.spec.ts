import 'dotenv/config'
import request from 'supertest'
import app from '../../src/app'

const jsonResponse = {}

const reqMock = {
  body: {
    data: {
      rootSecret: process.env.ROOT_SECRET
    }
  }
}

enum EHttpStatus {
  NO_CONTENT = 204
}

describe('DeleteAll User Flux', () => {
  it(`should delete all users from db with error "${EHttpStatus.NO_CONTENT}"`, async () => {
    const res = await request(app).delete('/delete-all-users').send(reqMock.body)

    console.log(res.body)

    expect(res.status).toBe(EHttpStatus.NO_CONTENT)
    expect(res.body).toEqual(jsonResponse)
  })
})
