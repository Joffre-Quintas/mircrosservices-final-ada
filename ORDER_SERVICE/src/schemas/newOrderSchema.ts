import * as yup from 'yup'

const newOrderSchema = yup.object({
  userId: yup.string().uuid().required(),
  description: yup.string().required()
})

type TNewOrder = yup.InferType<typeof newOrderSchema>

export {
  TNewOrder,
  newOrderSchema
}