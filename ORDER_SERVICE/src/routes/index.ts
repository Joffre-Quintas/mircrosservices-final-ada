import { Router } from "express";
import OrderServiceController from "../controllers/OrderServiceControllers";
import validations from "../middlewares/validation";
import { newOrderSchema } from "../schemas/newOrderSchema";

const routes = Router()

routes.post('/new-order', validations(newOrderSchema), OrderServiceController.newOrder)

export default routes