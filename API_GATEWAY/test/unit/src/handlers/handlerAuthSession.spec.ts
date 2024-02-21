/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import 'dotenv/config'
import HandlerAuthService from '../../../../src/handlers/HandlerAuthService'
import { errorFactory, reqMockFactory, resMockFactory } from '../../../../mocks'

jest.mock('axios')

describe('HandlerAuthSession', () => {
    const reqMock: any = reqMockFactory({
        email: 'email@mail.com',
        password: 'senha'
    })

    const reqMockToken: any = reqMockFactory({ token: 'token' })

    const resMock = resMockFactory()

    it('When call createSession axios.post should be called', async () => {
        await HandlerAuthService.createSession(reqMock, resMock)

        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith(`${process.env.AUTH_SERVICE_URL}/createSession`, reqMock.body)
    })
    it('createSession should be return an object = { token: string }', async () => {
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { token: 'asdadsadasda' } })

        await HandlerAuthService.createSession(reqMock, resMock)

        expect(resMock.status).toHaveBeenLastCalledWith(200)
        expect(resMock.json).toHaveBeenCalledWith({ token: expect.any(String) })
    })
    it('createSession should be return an Error when has server problem', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(errorFactory('Server error'))

        await HandlerAuthService.createSession(reqMock, resMock)

        expect(resMock.status).toHaveBeenLastCalledWith(500)
        expect(resMock.json).toHaveBeenCalledWith({ message: expect.any(String) })
    })

    it('When call verifySession axios.post should be called', async () => {
        await HandlerAuthService.verifySession(reqMockToken, resMock)

        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.AUTH_SERVICE_URL}/verifySession`,
            reqMockToken.body.token
        )
    })
    it('verifySession should be return a true when exist', async () => {
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: true })

        await HandlerAuthService.verifySession(reqMockToken, resMock)

        expect(resMock.status).toHaveBeenLastCalledWith(200)
        expect(resMock.json).toHaveBeenCalledWith(true)
    })
    it('verifySession should be return a false when session is expired or not exist', async () => {
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: false })

        await HandlerAuthService.verifySession(reqMockToken, resMock)

        expect(resMock.status).toHaveBeenLastCalledWith(200)
        expect(resMock.json).toHaveBeenCalledWith(false)
    })
    it('verifySession should be return an Error when has server problem', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(errorFactory('Server error'))

        await HandlerAuthService.createSession(reqMock, resMock)

        expect(resMock.status).toHaveBeenLastCalledWith(500)
        expect(resMock.json).toHaveBeenCalledWith({ message: expect.any(String) })
    })
})
