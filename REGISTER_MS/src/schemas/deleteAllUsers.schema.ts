import * as yup from 'yup'

const secret = process.env.DELETE_SECRET ?? 'delete-sem-where'

const deleteAllUsersSchema = yup.object({
  // needs to be equal to the env.DELETE_SECRET
  rootSecret: yup.string().required().equals([secret], 'get out of here')
})

export { deleteAllUsersSchema }
