import axios from 'axios'
import { Request, Response } from 'express'
import 'dotenv/config'

class HandlerAuthService {
    static createSession = async (req: Request, res: Response) => {
        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/createSession`, req.body)

            res.json(data)
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
        try {
            const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}/createSession`, req.body)

            res.json(data)
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
