import { Request, Response } from "express"
import OrderServiceUsecase from "../usecases/OrderServiceUsecase"
import { TNewOrder } from "../schemas/newOrderSchema"

class OrderServiceController {
  static async newOrder(req: Request, res: Response) {
    try {
      const { userId, description }: TNewOrder = req.body
      
      const actual = await OrderServiceUsecase.newOrder({userId, description})
      
      res.status(200).json(actual)
    } catch (error: any) {
      res.status(error.status ?? 500).json({message: error.message ?? 'Server error!'})
    }
  }
}

export default OrderServiceController