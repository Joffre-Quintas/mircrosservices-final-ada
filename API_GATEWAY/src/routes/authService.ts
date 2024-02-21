import { Router } from 'express'
import HandleAuthService from '../handlers/HandlerAuthService'
import { createSessionSchema } from '../schemas/createSession.schema'

import validations from '../middlewares/validation'

const routerAuthService = Router()

routerAuthService.post('/create-session', validations(createSessionSchema), HandleAuthService.createSession)
routerAuthService.get('/verify-session', HandleAuthService.verifySession)

export default routerAuthService
