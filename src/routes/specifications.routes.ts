import { Router } from 'express'
import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecification/CreateSpecificationsController'

const specificationsRouter = Router()

const createSpecificationsController = new CreateSpecificationsController()

specificationsRouter.post(
  '/',
  ensureAuthentication,
  createSpecificationsController.handle
)

export { specificationsRouter }
