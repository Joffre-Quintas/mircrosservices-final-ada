import 'dotenv/config'
import request from 'supertest'
import app from '../../src/app'

enum EHttpStatus {
  NO_CONTENT = 200
}

describe('FindAll User Flux', () => {
  it(`should find all users from db with error "${EHttpStatus.NO_CONTENT}"`, async () => {
    const res = await request(app).get('/find-all-users').send()

    console.log(res.body)

    expect(res.status).toBe(EHttpStatus.NO_CONTENT)
    expect(res.body).toBeInstanceOf(Object)
  })
})
