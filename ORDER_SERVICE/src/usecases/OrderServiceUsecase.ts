import PayloadRMQDTO from '../DTO/PayloadRMQ'
import CustomException from '../exceptions/CustoException'
import prisma from '../prisma'
import { TNewOrder } from '../schemas/newOrderSchema'
import Rabbitmq from '../services/rabbitmq'
import 'dotenv/config'
class OrderServiceUsecase {
    constructor(private prismaInstance = prisma) {}

    async newOrder(order: TNewOrder) {
        const user = await this.prismaInstance.user.findFirst({ where: { id: order.userId } })

        if (!user) {
            throw new CustomException(404, 'User not found!')
        }

        await prisma.orders.create({ data: order })

        Rabbitmq.publisherInQueueNotification(
            JSON.stringify(new PayloadRMQDTO(user.id, user.name, user.email, order.description, 'order'))
        )

        return { message: 'Order registered!' }
    }
}

export default OrderServiceUsecase
