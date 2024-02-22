import { Router } from 'express'
import HandleAuthService from '../handlers/HandlerAuthSession'
import { token } from '../schemas/verify.Session.schema'

import { createSessionSchema } from '../schemas/createSession.schema'

import validations from '../middlewares/validation'

const routerAuthService = Router()

routerAuthService.post('/create-session', validations(createSessionSchema), HandleAuthService.createSession)
routerAuthService.post('/verify-session', validations(token), HandleAuthService.verifySession)


export default routerAuthService
