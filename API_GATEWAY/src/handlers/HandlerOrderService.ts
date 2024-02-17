import axios from 'axios'
import { Request, Response } from 'express'
import 'dotenv/config'
import { TNewOrder } from '../schemas/newOrder.schema'

class HandlerOrderService {
    static async newOrder(req: Request, res: Response) {
        const dataBody: TNewOrder = req.body
        try {
            const { data } = await axios.post(`${process.env.ORDER_SERVICE_URL}/new-order`, dataBody)

            res.status(200).json(data)
        } catch (error: any) {
            return res
                .status(error.response?.status || 500)
                .json({ error: error.response?.data?.message || 'Server error' })
        }
    }
}

export default HandlerOrderService
