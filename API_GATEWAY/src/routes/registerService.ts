import { Router } from 'express'

import validations from '../middlewares/validation'
import HandlerRegisterService from '../handlers/HandlerRegisterService'
import { registerSchema } from '../schemas/register.schema'

const routerRegisterService = Router()

routerRegisterService.post('/register', validations(registerSchema), HandlerRegisterService.register)

export default routerRegisterService
