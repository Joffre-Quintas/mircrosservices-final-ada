import { Router } from 'express'
import AuthControllers from '../controllers/AuthControllers'
import validationSchema from '../middleware/validationSchema'

import { createSessionSchema } from '../schema/createSessionSchema'

const router = Router()

router.post('/create-session', validationSchema(createSessionSchema), AuthControllers.createSession)

export default router
