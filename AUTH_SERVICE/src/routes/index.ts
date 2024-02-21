import { Router } from 'express'
import AuthUsecase from '../usecases/AuthUsecase'
import AuthControllers from '../controllers/AuthControllers'
import prisma from '../prisma'
import validations from '../middlewares/validation'
import { loginSchema } from '../schema/loginSchema'

const routes = Router()

const authUsecase = new AuthUsecase(prisma)
const authControllers = new AuthControllers(authUsecase)

routes.post('/create-session', validations(loginSchema), authControllers.createSession)
routes.get('/verify-session', authControllers.verify)

export default routes