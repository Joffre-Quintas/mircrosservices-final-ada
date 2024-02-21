import { Request, Response } from 'express'
import AuthUsecase from '../usecases/AuthUsecase'
import { TLogin } from '../schema/loginSchema'
import CustomException from '../exceptions'

class AuthControllers {
    private authUsecase: AuthUsecase

    constructor(authUsecase: AuthUsecase) {
        this.authUsecase = authUsecase
    }

    createSession = async (req: Request, res: Response) => {
        try {
            const login: TLogin = req.body

            const token: string = await this.authUsecase.createSession(login)

            res.status(200).json(token)
        } catch (error: any) {
            res.status(error.status || 500).json({ message: error.message })
        }
    }

    verify = async (req: Request, res: Response) => {
        try {
            const token: string | undefined = req.headers.authorization

            if (!token) {
                throw new CustomException(400, 'Token is empty!')
            }
            const isChecked: boolean = await this.authUsecase.verify(token)

            res.status(200).json(isChecked)
        } catch (error: any) {
            res.status(error.status || 500).json({ message: error.message })
        }
    }
}

export default AuthControllers
