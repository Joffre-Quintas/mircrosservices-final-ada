import * as yup from 'yup'

const verifySessionSchema = yup.object({
    token: yup.string().required()
})

type TVerifySession = yup.InferType<typeof verifySessionSchema>

export { verifySessionSchema, TVerifySession }
