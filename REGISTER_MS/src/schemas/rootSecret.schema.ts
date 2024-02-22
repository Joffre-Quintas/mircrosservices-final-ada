import * as yup from 'yup'

const secret = process.env.ROOT_SECRET

const rootSecret = yup.object({
  rootSecret: yup.string().required().equals([secret], 'get out of here!')
})

export { rootSecret }
