import { PrismaClient } from '@prisma/client'
import { IEnterUser } from '../schemas/enterUserSchema'
import UserDTO from '../DTO/UserDTO'
import cryptPassword from '../utils/cryptPassword'

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

    createUser = async ({ name, email, cpf, address, password, confirmPassword }: IEnterUser): Promise<string> => {
        const userByCPF = await this.getUserByCpf(cpf)
        const userByEmail = await this.getUserByEmail(email)

        if (userByCPF || userByEmail) {
            throw new Error('This user already exist!')
        }

        if (password !== confirmPassword) {
            throw new Error('Passwords dont match!')
        }

        const cryptedPassword = await cryptPassword(password)
        const userDTO: UserDTO = new UserDTO(name, email, cpf, address, cryptedPassword)

        const createdUser = await this.prismaInstance.user.create({ data: userDTO, include: { address: true } })

        if (!createdUser) {
            throw new Error('Problem to create user, try again later.')
        }

        return 'User created!'
    }
}

export default UserUsecase
