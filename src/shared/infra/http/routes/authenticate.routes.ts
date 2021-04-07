import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const authenticationRouter = Router()

const authenticateUserController = new AuthenticateUserController()

authenticationRouter.post('/', authenticateUserController.handle)

export { authenticationRouter }
