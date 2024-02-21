import axios, { isAxiosError } from 'axios'
import { Request, Response } from 'express'

class HandlerRegisterService {
    static register = async (req: Request, res: Response) => {
        try {
            const dataToRegister: { cep: string; number: string; complement: string } = req.body
            let addressId: null | string = null

            addressId = (await axios.post(`${process.env.ADDRESS_SERVICE_URL}/get-address`, dataToRegister)).data

            if (!addressId) {
                addressId = (await axios.post(`${process.env.ADDRESS_SERVICE_URL}/create-address`, dataToRegister)).data
            }

            res.status(200).json(addressId)
        } catch (error: any) {
            if (isAxiosError(error)) {
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
