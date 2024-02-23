import { TCreateSessionSchema } from '../schema/createSessionSchema'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel'
import CustomException from '../exceptions'


class CreateSessionUsecases {
    static async createSession(user: TCreateSessionSchema) {
        const data = await userModel.findOne({ email: user.email })

        if (!data) {
            throw new CustomException(404, 'User not found!')
        }

        const verifyPassword = await bcrypt.compare(user.password, data.password)

        if (!verifyPassword) {
            throw new CustomException(400, 'password invalid!')
        }

        const token = jwt.sign(user, process.env.SECRET as string, {
            expiresIn: 1 * 60
            })

        return token
    }
}

export default CreateSessionUsecases