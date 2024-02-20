import { Router } from 'express'
import prisma from '../prisma'
import UserUsecase from '../usecases/UserUseCase'
import UserControllers from '../controllers/UserControllers'
import validations from '../middlewares/validation'
import { enterUserSchema } from '../schemas/enterUserSchema'

const routes = Router()

const userUsecase = new UserUsecase(prisma)
const userController = new UserControllers(userUsecase)

routes.post('/register', validations(enterUserSchema), userController.newUser)

export default routes
