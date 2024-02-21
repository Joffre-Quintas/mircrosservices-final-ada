import axios, { isAxiosError } from 'axios'
import { Request, Response } from 'express'
import 'dotenv/config'
import { TCreateSession } from '../schemas/createSession.schema'
import CustomException from '../exceptions/CustomExcepetion'

class HandlerAuthService {
    static createSession = async (req: Request, res: Response) => {
        const dataBody: TCreateSession = req.body

        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/create-session`, dataBody)

            res.status(200).json(data)
        } catch (error: any) {
            if (isAxiosError(error)) {
                return res
                    .status(error.response?.status || 500)
                    .json({ message: error.response?.data?.message || 'Server error' })
            } else {
                res.status(error.status || 500).json({ message: error.message || 'Server error' })
            }
        }
    }

    static verifySession = async (req: Request, res: Response) => {
        try {
            const token: string | undefined = req.headers.authorization

            if (!token) {
                throw new CustomException(404, 'Authorization is missing!')
            }

            const { data } = await axios.get(`${process.env.AUTH_SERVICE_URL}/verify-session`, {
                headers: {
                    Authorization: token
                }
            })

            res.status(200).json(data)
        } catch (error: any) {
            if (isAxiosError(error)) {
                return res
                    .status(error.response?.status || 500)
                    .json({ message: error.response?.data?.message || 'Server error' })
            } else {
                res.status(error.status || 500).json({ message: error.message || 'Server error' })
            }
        }
    }
}

export default HandlerAuthService
