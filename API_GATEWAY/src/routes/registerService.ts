import { Router } from 'express'

import validations from '../middlewares/validation'
import HandlerRegisterService from '../handlers/HandlerRegisterService'

const routerRegisterService = Router()

routerRegisterService.post('/register', HandlerRegisterService.register)

export default routerRegisterService
