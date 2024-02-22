import * as yup from 'yup'

const createSessionSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

type TCreateSessionSchema = yup.InferType<typeof createSessionSchema>

export { createSessionSchema, TCreateSessionSchema }