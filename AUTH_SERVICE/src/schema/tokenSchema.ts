import * as yup from 'yup'

const tokenSchema = yup.object({
    token: yup.string().required()
})

export default tokenSchema
