import { PrismaClient } from '@prisma/client'
import { TLogin } from '../schema/loginSchema'
import jwt from 'jsonwebtoken'
import CustomException from '../exceptions'

class AuthUsecase {
    private prismaInstance: PrismaClient
    constructor(prismaInstance: PrismaClient) {
        this.prismaInstance = prismaInstance
    }

    createSession = async (login: TLogin) => {
        const user = await this.prismaInstance.user.findFirst({
            where: {
                email: login.email
            }
        })
        if (!user) {
            throw new CustomException(404, 'User not found!')
        }
        const token = await jwt.sign(user, process.env.SECRET as string)
        return token
    }

    verify = async (bearerToken: string) => {
        const token = bearerToken.split(' ')[1]
        const user = jwt.verify(token, process.env.SECRET as string)

        return !!user
    }
}

export default AuthUsecase
