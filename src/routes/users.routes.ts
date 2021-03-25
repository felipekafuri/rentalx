import { Router } from 'express'
import { CreateUsersController } from '../modules/accounts/useCases/createUser/CreateUsersController'

const userRouter = Router()

const createUserController = new CreateUsersController()

userRouter.post('/', createUserController.handle)

export { userRouter }
