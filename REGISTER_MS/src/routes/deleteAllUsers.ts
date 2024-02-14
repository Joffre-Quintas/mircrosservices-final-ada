import { Router } from 'express'
import { AplicationController } from '../controller/aplicationController'

const deleteAllUsers = Router()

deleteAllUsers.delete('/delete-all-users', AplicationController.deleteAllUsers)

export default deleteAllUsers
