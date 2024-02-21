import { PrismaClient } from '@prisma/client'
import { TEnterUser } from '../schemas/enterUserSchema'
import UserDTO from '../DTO/UserDTO'
import cryptPassword from '../utils/cryptPassword'
import Rabbitmq from '../services/rabbitmq'
import PayloadRMQDTO from '../DTO/payloadRMQ'
import CustomException from '../exceptions/CustoException'

class UserUsecase {
    private prismaInstance: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaInstance = prismaInstance
    }

    private getUser = async (data: string, field: string) => {
        const user = await this.prismaInstance.user.findFirst({
            where: {
                [field]: data
            }
        })
        return user
    }

    getUserByCpf = async (cpf: string) => {
        return this.getUser(cpf, 'cpf')
    }
    getUserByEmail = async (email: string) => {
        return this.getUser(email, 'email')
    }

    createUser = async ({ name, email, cpf, address, password, confirmPassword }: TEnterUser): Promise<string> => {
        const userByCPF = await this.getUserByCpf(cpf)
        const userByEmail = await this.getUserByEmail(email)

        if (userByCPF || userByEmail) {
            throw new Error('This user already exist!')
        }

        if (password !== confirmPassword) {
            throw new CustomException(400, 'Passwords dont match!')
        }

        const cryptedPassword = await cryptPassword(password)
        const userDTO: UserDTO = new UserDTO(name, email, cpf, address, cryptedPassword)

        const createdUser = await this.prismaInstance.user.create({ data: userDTO })

        Rabbitmq.publisherInQueueNotification(
            JSON.stringify(new PayloadRMQDTO(createdUser.id, createdUser.name, createdUser.email, 'register'))
        )
        return 'User created!'
    }
}

export default UserUsecase
