import axios from 'axios'
import { Request, Response } from 'express'
import 'dotenv/config'
import { TToken } from '../schemas/verify.Session.schema'
import { TCreateSession } from '../schemas/createSession.schema'

class HandlerAuthService {
    static createSession = async (req: Request, res: Response) => {
        const dataBody: TCreateSession = req.body

        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/createSession`, dataBody)

            res.status(200).json(data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return res
                    .status(error.response?.status || 500)
                    .json({ error: error.response?.data?.error || 'Server error' })
            }
            return res.status(500).json({ message: 'Server error' })
        }
    }

    static verifySession = async (req: Request, res: Response) => {
        const dataBody: TToken = req.body

        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/verifySession`, dataBody.token)

            res.status(200).json(data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return res
                    .status(error.response?.status || 500)
                    .json({ error: error.response?.data?.error || 'Server error' })
            }
            return res.status(500).json({ message: 'Server error' })
        }
    }
}

export default HandlerAuthService
