import { Router } from 'express'
import multer from 'multer'
import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { CreateUsersController } from '../modules/accounts/useCases/createUser/CreateUsersController'
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updatedUserAvatar/UpdateUserAvatarController'
import uploadConfig from '../config/upload'

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const userRouter = Router()

const createUserController = new CreateUsersController()
const updateUserAvatarController = new UpdateUserAvatarController()

userRouter.post('/', createUserController.handle)
userRouter.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
)

export { userRouter }
