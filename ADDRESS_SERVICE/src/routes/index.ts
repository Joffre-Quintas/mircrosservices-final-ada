import { Router } from 'express'
import AddressController from '../controllers/AddressController'
import AddressUsecase from '../usecases/Address.usecase'
import prisma from '../prisma'
import validations from '../middlewares/validation'
import { dataEnterAddressSchema } from '../schemas/dataEnterAddressSchema'

const routes = Router()

const addressUsecase = new AddressUsecase(prisma)
const addressController = new AddressController(addressUsecase)

routes.use(validations(dataEnterAddressSchema))
routes.get('/get-address', addressController.getAddress)
routes.post('/create-address', addressController.createAddress)

export default routes
