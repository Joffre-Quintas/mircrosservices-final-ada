import * as yup from 'yup'

const createSessionSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

type TCreateSession = yup.InferType<typeof createSessionSchema>

export { createSessionSchema, TCreateSession }
