import { PrismaClient } from '@prisma/client'
import { TDataEnterAddress } from '../schemas/dataEnterAddressSchema'
import axios from 'axios'
import { TCompletAddress } from '../types/completAddressType'
import { TViacep } from '../types/viacepType'

class AddressUsecase {
    private prismaInstance: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaInstance = prismaInstance
    }
    getAddress = async ({ cep, number, complement }: TDataEnterAddress) => {
        const address = await this.prismaInstance.address.findFirst({
            where: {
                cep,
                number,
                complement
            }
        })
        return address
    }

    createAddress = async ({ cep, number, complement }: TDataEnterAddress) => {
        const addressExist = await this.getAddress({ cep, number, complement })
        if (addressExist) {
            throw new Error('Address alredy exist!')
        }
        const {
            data: { logradouro, bairro, localidade, uf }
        }: { data: TViacep } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        const addressCompletDTO: TCompletAddress = {
            cep: cep,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf,
            country: 'Brasil',
            number: number,
            complement: complement
        }

        return await this.prismaInstance.address.create({ data: addressCompletDTO })
    }
}

export default AddressUsecase
