import { Router } from 'express'
import { Singleton } from '../singletons'

const handler = Singleton.getInstance().HandlerFindAllUsers

const deleteAllUsers = Router()

deleteAllUsers.get('/find-all-users', handler.execute)

export default deleteAllUsers
