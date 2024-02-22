import { Router } from 'express'
import { Singleton } from '../singletons'
import validations from '../middlewares/validation'
import { rootSecret } from '../schemas'

const handler = Singleton.getInstance().HandlerFindAllUsers

const deleteAllUsers = Router()

deleteAllUsers.get('/find-all-users', validations(rootSecret), handler.execute)

export default deleteAllUsers
