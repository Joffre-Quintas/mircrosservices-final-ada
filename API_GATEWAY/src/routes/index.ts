import { Router } from 'express'
import routerAuthService from './authService'
import routerOrderService from './orderService'

const routes: Router[] = [routerAuthService, routerOrderService]

export default routes
