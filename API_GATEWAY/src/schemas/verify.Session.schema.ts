import * as yup from 'yup'

const token = yup.object({
    token: yup.string().required()
})

type TToken = yup.InferType<typeof token>

export { token, TToken }
