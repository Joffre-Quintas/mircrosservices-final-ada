import prisma from "../prisma"
import { TNewOrder } from "../schemas/newOrderSchema"

class OrderServiceUsecase {
  static newOrder = async (order: TNewOrder) => {
    const createOrder = await prisma.orders.create({data: order})

    if(!createOrder) throw new Error('Problem to create new Order!')
  }
}

export default OrderServiceUsecase