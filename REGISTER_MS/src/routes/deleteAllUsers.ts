import { Router } from 'express'
import validations from '../middlewares/validation'
import { rootSecret } from '../schemas'
import { Singleton } from '../singletons'

const handler = Singleton.getInstance().HandlerDeleteAllUsers

const deleteAllUsers = Router()

deleteAllUsers.delete('/delete-all-users', validations(rootSecret), handler.execute)

export default deleteAllUsers
