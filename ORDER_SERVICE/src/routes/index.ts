import { Router } from 'express'
import { OrderServiceController } from '../controllers/OrderServiceControllers'
import { OrderServiceUsecase } from '../usecases/OrderServiceUsecase'
import validations from '../middlewares/validation'
import { newOrderSchema } from '../schemas/newOrderSchema'
import prisma from '../prisma'

const routes = Router()

const orderService = new OrderServiceUsecase(prisma)
const orderController = new OrderServiceController(orderService)

routes.post('/new-order', validations(newOrderSchema), orderController.newOrder)

export default routes
