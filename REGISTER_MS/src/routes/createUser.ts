import { Router } from 'express'
import { createUserSchema } from '../schemas'
import validations from '../middlewares/validation'
import { Singleton } from '../singletons'

const handler = Singleton.getInstance().HandlerCreateUser

const createUser = Router()

createUser.post('/create-user', validations(createUserSchema), handler.execute)

export default createUser
