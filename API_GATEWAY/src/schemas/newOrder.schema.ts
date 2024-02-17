import * as yup from 'yup'

const newOrderShema = yup.object({
    userId: yup.string().uuid().required(),
    description: yup.string().required()
})

type TNewOrder = yup.InferType<typeof newOrderShema>

export { newOrderShema, TNewOrder }
