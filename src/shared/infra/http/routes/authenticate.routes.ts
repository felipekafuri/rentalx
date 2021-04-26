import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticationRouter = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authenticationRouter.post('/', authenticateUserController.handle)
authenticationRouter.post('/refresh-token', refreshTokenController.handle)

export { authenticationRouter }
