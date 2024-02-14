import { Router } from 'express'
import createUser from './createUser'
import deleteAllUsers from './deleteAllUsers'

const routes: Router[] = [createUser, deleteAllUsers]

export default routes
