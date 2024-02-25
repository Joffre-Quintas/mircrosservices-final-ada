import { Request, Response } from 'express'
import OrderServiceUsecase from '../usecases/OrderServiceUsecase'
import { TNewOrder } from '../schemas/newOrderSchema'

class OrderServiceController {
    private orderService: OrderServiceUsecase

    constructor(orderService: OrderServiceUsecase) {
        this.orderService = orderService

        this.newOrder = this.newOrder.bind(this)
    }

    async newOrder(req: Request, res: Response) {
        try {
            const { userId, description }: TNewOrder = req.body
            const response = await this.orderService.newOrder({ userId, description })

            res.status(200).json(response)
        } catch (error: any) {
            res.status(error.status ?? 500).json({ message: error.message ?? 'Server error!' })
        }
    }
}

export default OrderServiceController
