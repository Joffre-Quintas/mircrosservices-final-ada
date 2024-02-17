import CustomException from "../exceptions/CustoException"
import prisma from "../prisma"
import { TNewOrder } from "../schemas/newOrderSchema"

class OrderServiceUsecase {
  static newOrder = async (order: TNewOrder) => {
    const user = await prisma.user.findFirst({where: {id: order.userId}})

    if(!user) {
      throw new CustomException(404, 'User not found!')
    }

    await prisma.orders.create({data: order})

    return true
  }
}

export default OrderServiceUsecase