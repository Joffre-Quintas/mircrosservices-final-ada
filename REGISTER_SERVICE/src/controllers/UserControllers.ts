import { Request, Response } from 'express'
import UserUsecase from '../usecases/UserUseCase'
import { TEnterUser } from '../schemas/enterUserSchema'

class UserControllers {
    private userUsecase: UserUsecase

    constructor(userCase: UserUsecase) {
        this.userUsecase = userCase
    }
    newUser = async (req: Request, res: Response) => {
        try {
            const data: TEnterUser = req.body

            const actual: string = await this.userUsecase.createUser(data)

            res.status(200).json({ message: actual })
        } catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message })
        }
    }
}

export default UserControllers
