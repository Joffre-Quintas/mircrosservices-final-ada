import * as yup from 'yup'

const dataEnterAddressSchema = yup.object({
    cep: yup.string().length(8).required(),
    number: yup.string().required(),
    complement: yup.string().required()
})

type TDataEnterAddress = yup.InferType<typeof dataEnterAddressSchema>

export { TDataEnterAddress, dataEnterAddressSchema }
