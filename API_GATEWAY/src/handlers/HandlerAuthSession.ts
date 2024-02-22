import axios from 'axios'
import { Request, Response } from 'express'
import 'dotenv/config'
import { TVerifySession } from '../schemas/verify.Session.schema'

class HandlerAuthService {
    static createSession = async (req: Request, res: Response) => {
        const dataBody: TCreateSession = req.body

        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/create-session`, dataBody)

            res.status(200).json(data)
        } catch (error: any) {
            return res
                .status(error.response?.status || 500)
                .json({ error: error.response?.data?.error || 'Server error' })
        }
    }

    static verifySession = async (req: Request, res: Response) => {
        const { token } = req.body as TVerifySession
        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/createSession`, token)

            res.status(200).json(data)
        } catch (error: any) {
            return res
                .status(error.response?.status || 500)
                .json({ error: error.response?.data?.error || 'Server error' })
        }
    }
}

export default HandlerAuthService