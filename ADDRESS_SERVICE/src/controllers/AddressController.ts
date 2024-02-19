import { Request, Response } from 'express'
import { TDataEnterAddress } from '../schemas/dataEnterAddressSchema'
import AddressUsecase from '../usecases/Address.usecase'
import { isAxiosError } from 'axios'

class AddressController {
    private addressUsecace: AddressUsecase

    constructor(addressUsecase: AddressUsecase) {
        this.addressUsecace = addressUsecase
    }
    getAddress = async (req: Request, res: Response) => {
        try {
            const data: TDataEnterAddress = req.body

            const address = await this.addressUsecace.getAddress(data)

            res.status(200).json(address?.id)
        } catch (error: any) {
            if (isAxiosError(error)) {
                res.status(error.response?.status || 500).json({
                    message: error.response?.data.message || 'Server Error'
                })
            } else {
                res.status(500).json({ message: error.message })
            }
        }
    }

    createAddress = async (req: Request, res: Response) => {
        try {
            const data: TDataEnterAddress = req.body

            const address = await this.addressUsecace.createAddress(data)

            res.status(200).json(address.id)
        } catch (error: any) {
            if (isAxiosError(error)) {
                res.status(error.response?.status || 500).json({
                    message: error.response?.data.message || 'Server Error'
                })
            } else {
                res.status(500).json({ message: error.message })
            }
        }
    }
}

export default AddressController
