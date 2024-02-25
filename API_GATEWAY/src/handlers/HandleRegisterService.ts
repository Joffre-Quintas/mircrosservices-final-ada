import axios, { isAxiosError } from 'axios'
import { Request, Response } from 'express'
import { TRegister } from '../schemas/register.schema'
import UserDTO from '../DTO/UserDTO'
class HandlerRegisterService {
    static register = async (req: Request, res: Response) => {
        try {
            const dataToRegister: TRegister = req.body
            const { cep, number, complement, ...user } = dataToRegister
            const dataAddress = { cep, number, complement }

            let addressId: string

            addressId = (await axios.post(`${process.env.ADDRESS_SERVICE_URL}/get-address`, dataAddress)).data

            if (!addressId) {
                addressId = (await axios.post(`${process.env.ADDRESS_SERVICE_URL}/create-address`, dataAddress)).data
            }

            const userDTO = new UserDTO(user.name, user.email, user.cpf, user.password, user.confirmPassword, addressId)

            const { data: register } = await axios.post(`${process.env.REGISTER_SERVICE_URL}/create-user`, userDTO)

            res.status(200).json(register)
        } catch (error: any) {
            if (isAxiosError(error)) {
                console.log(error.response?.data)
                return res
                    .status(error.response?.status || 500)
                    .json({ message: error.response?.data?.message || 'Server error' })
            } else {
                res.status(error.status || 500).json({ message: error.message || 'Server error' })
            }
        }
    }
}

export default HandlerRegisterService
