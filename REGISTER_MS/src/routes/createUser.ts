import { Router } from 'express'
import {AplicationController} from '../controller/aplicationController'
import { createUserSchema } from '../schemas/createUser.schema'

import validations from '../middlewares/validation'

const createUser = Router()

createUser.post('/create-user', validations(createUserSchema), AplicationController.createUser)

export default createUser
