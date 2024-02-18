import { Router } from 'express'
import validations from '../middlewares/validation'
import { deleteAllUsersSchema } from '../schemas'
import { Singleton } from '../singletons'

const handler = Singleton.getInstance().HandlerDeleteAllUsers

const deleteAllUsers = Router()

deleteAllUsers.delete('/delete-all-users', validations(deleteAllUsersSchema), handler.execute)

export default deleteAllUsers
