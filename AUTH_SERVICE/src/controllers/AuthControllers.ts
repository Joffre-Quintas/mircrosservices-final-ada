import { Request, Response } from 'express'
import AuthUsecases from '../usecases/AuthUsecases'

class AuthControllers {
    static async createSession(req: Request, res: Response) {
        try {
            const token = await AuthUsecases.createSession(req.body)
            res.json(token)
        } catch (error: any) {
            res.status(error.status ?? 400).json({ message: error.message ?? 'Problem internal server.' })
        }
    }
}

export default AuthControllers
