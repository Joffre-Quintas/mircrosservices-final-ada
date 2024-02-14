import { TCreateSessionSchema } from '../schema/createSessionSchema'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel'
import CustomException from '../exceptions'

class AuthUsecases {
    static async createSession(user: TCreateSessionSchema) {
        // const passwordCrypted = await bcrypt.hash(user.password, 10)
        // await userModel.create({ email: user.email, password: passwordCrypted })
        const data = await userModel.findOne({ email: user.email })

        if (!data) {
            throw new CustomException(404, 'User not found!')
        }

        const verifyPassword = await bcrypt.compare(user.password, data.password)

        if (!verifyPassword) {
            throw new CustomException(400, 'password invalid!')
        }

        const token = jwt.sign(user, process.env.SECRET as string)

        return token
    }
}

export default AuthUsecases
