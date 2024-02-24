import { Router } from 'express'
import HandlerOrderService from '../handlers/HandlerOrderService'
import validations from '../middlewares/validation'
import { newOrderShema } from '../schemas/newOrder.schema'

const routerOrderService = Router()

routerOrderService.post('/new-order', validations(newOrderShema), HandlerOrderService.newOrder)

export default routerOrderService
