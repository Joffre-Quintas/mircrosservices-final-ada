import { Router } from 'express'
import HandleAuthService from '../handlers/HandlerAuthSession'
import { token } from '../schemas/verify.Session.schema'
import { createSessionSchema } from '../schemas/createSession.schema'

import validations from '../middlewares/validation'

const routerAuthService = Router()

routerAuthService.post('/createSession', validations(createSessionSchema), HandleAuthService.createSession)
routerAuthService.post('/verifySession', validations(token), HandleAuthService.verifySession)

export default routerAuthService
