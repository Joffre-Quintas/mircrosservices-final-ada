import * as yup from 'yup'

const enterUserSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().length(11).required(),
    address: yup.string().uuid().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
})

interface IEnterUser extends yup.InferType<typeof enterUserSchema> {}

export { enterUserSchema, IEnterUser }
