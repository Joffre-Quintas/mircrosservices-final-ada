import * as yup from 'yup'

const createUserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().required(),
  streetNumber: yup.number().required(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .when('password', (password, schema) => {
      return schema.oneOf(password)
    })
})

export { createUserSchema }
