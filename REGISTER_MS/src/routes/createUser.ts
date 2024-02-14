import { Router } from 'express'
import {AplicationController} from '../controller/aplicationController'
import { createUserSchema } from '../schemas/createUserSchema.schema'

import validations from '../middlewares/validation'

const createUser = Router()

createUser.post('/createUser', validations(createUserSchema), AplicationController.createUser)

export default createUser