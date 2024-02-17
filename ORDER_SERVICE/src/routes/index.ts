import { Router } from "express";
import OrderServiceController from "../controllers/OrderServiceControllers";

const routes = Router()

routes.get('/new-order', OrderServiceController.newOrder)

export default routes