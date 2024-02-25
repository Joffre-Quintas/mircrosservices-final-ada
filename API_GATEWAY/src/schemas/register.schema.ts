import * as yup from 'yup'

const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().length(11).required(),
    cep: yup.string().length(8).required(),
    number: yup.string().required(),
    complement: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

type TRegister = yup.InferType<typeof registerSchema>

export { registerSchema, TRegister }
