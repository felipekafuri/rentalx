import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUsersController } from '@modules/accounts/useCases/createUser/CreateUsersController'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updatedUserAvatar/UpdateUserAvatarController'

import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { ProfileUserController } from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController'

const uploadAvatar = multer(uploadConfig)

const userRouter = Router()

const createUserController = new CreateUsersController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileController = new ProfileUserController()

userRouter.post('/', createUserController.handle)
userRouter.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)
userRouter.get('/profile', ensureAuthentication, profileController.handle)

export { userRouter }
