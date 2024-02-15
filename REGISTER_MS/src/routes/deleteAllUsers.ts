import { Router } from 'express'
import { AplicationController } from '../controller/aplicationController'
import validations from '../middlewares/validation'
import { deleteAllUsersSchema } from '../schemas/deleteAllUsers.schema'

const deleteAllUsers = Router()

deleteAllUsers.delete('/delete-all-users', validations(deleteAllUsersSchema), AplicationController.deleteAllUsers)

export default deleteAllUsers
