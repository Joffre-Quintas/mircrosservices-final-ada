import { Router } from 'express'
import routerAuthService from './authService'
import routerOrderService from './orderService'
import routerRegisterService from './registerService'

const routes: Router[] = [routerAuthService, routerOrderService, routerRegisterService]

export default routes
