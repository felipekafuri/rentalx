import { Router } from 'express'

import { CreateSpecificationsController } from '@modules/cars/useCases/createSpecification/CreateSpecificationsController'

import { ensureAuthentication } from '../middlewares/ensureAuthentication'

const specificationsRouter = Router()

const createSpecificationsController = new CreateSpecificationsController()

specificationsRouter.post(
  '/',
  ensureAuthentication,
  createSpecificationsController.handle
)

export { specificationsRouter }
