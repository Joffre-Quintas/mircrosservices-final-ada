import { Router } from 'express'
import createUser from './createUser'
import deleteAllUsers from './deleteAllUsers'
import findAllUsers from './findAllUsers'

const routes: Router[] = [createUser, deleteAllUsers, findAllUsers]

export default routes
