import { Router } from 'express'
import HandleAuthService from '../handlers/HandlerAuthSession'
import { verifySessionSchema } from '../schemas/verify.Session.schema'
import { createSessionSchema } from '../schemas/createSession.schema'

import validations from '../middlewares/validation'

const routerAuthService = Router()

routerAuthService.post('/createSession', validations(createSessionSchema), HandleAuthService.createSession)
routerAuthService.post('/verifySession', validations(verifySessionSchema), HandleAuthService.verifySession)

export default routerAuthService
