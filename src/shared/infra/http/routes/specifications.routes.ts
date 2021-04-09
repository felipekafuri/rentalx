import { Router } from 'express'

import { CreateSpecificationsController } from '@modules/cars/useCases/createSpecification/CreateSpecificationsController'

import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin'

const specificationsRouter = Router()

const createSpecificationsController = new CreateSpecificationsController()

specificationsRouter.post(
  '/',
  ensureAuthentication,
  ensureIsAdmin,
  createSpecificationsController.handle
)

export { specificationsRouter }
