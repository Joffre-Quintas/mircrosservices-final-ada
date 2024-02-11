import { Router } from 'express'
import HandleAuthService from '../handlers/HandlerAuthSession'
import { verifySessionSchema } from '../middlewares/validations/schemas/verify.Session.schema'
import { createSessionSchema } from '../middlewares/validations/schemas/createSession.schema'

import validations from '../middlewares/validations/validation'

const routerAuthService = Router()

routerAuthService.post('/createSession', validations(createSessionSchema), HandleAuthService.createSession)
routerAuthService.post('/verifySession', validations(verifySessionSchema), HandleAuthService.verifySession)

export default routerAuthService
