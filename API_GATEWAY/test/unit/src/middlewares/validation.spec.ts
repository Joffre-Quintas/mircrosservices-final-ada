/* eslint-disable @typescript-eslint/no-explicit-any */
import { nextMock, reqMockFactory, resMockFactory } from '../../../../mocks'
import validations from '../../../../src/middlewares/validation'
import { createSessionSchema } from '../../../../src/schemas/createSession.schema'

describe('Validations middleware', () => {
    it('should be call next()', async () => {
        const reqMock: any = reqMockFactory({
            email: 'email@mail.com',
            password: 'qualquer'
        })
        const resMock = resMockFactory()

        await validations(createSessionSchema)(reqMock, resMock, nextMock)

        expect(nextMock).toHaveBeenCalled()
    })
    it('should be return status 400 and error message', async () => {
        const reqMock: any = reqMockFactory({
            name: 'email@mail.com',
            age: 'qualquer'
        })
        const resMock: any = resMockFactory()

        try {
            await validations(createSessionSchema)(reqMock, resMock, nextMock)
        } catch (error: any) {
            expect(error.status).toHaveBeenCalledWith(400)
            expect(error.json).toHaveBeenCalledWith(expect.any(String))
        }
    })
})
