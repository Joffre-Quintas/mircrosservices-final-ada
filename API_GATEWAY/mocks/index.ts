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
export const erroAxiosFactory = (status: number, message: string) => {
    return {
        error: {
            reponse: {
                status: status,
                data: {
                    error: message
                }
            }
        }
    }
}
export const nextMock = jest.fn()
