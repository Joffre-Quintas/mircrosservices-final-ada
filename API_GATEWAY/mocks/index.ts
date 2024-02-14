import { Response } from 'express'

export const reqMockFactory = (data: Record<string, string | number | boolean>) => {
    return {
        body: { ...data }
    }
}

export const resMockFactory = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    } as unknown as Response
}

export const errorFactory = (message: string) => {
    return new Error(message)
}
export const nextMock = jest.fn()
