import * as yup from 'yup'

const createUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  addressId: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .when('password', (password, schema) => {
      return schema.oneOf(password, "Password and Confirm Password must be the same.")
    })
})

export { createUserSchema }
