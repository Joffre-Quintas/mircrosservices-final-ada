import * as yup from 'yup'

const secret = process.env.DELETE_SECRET

const deleteAllUsersSchema = yup.object({
  rootSecret: yup.string().required().equals([secret], 'get out of here!')
})

export { deleteAllUsersSchema }
