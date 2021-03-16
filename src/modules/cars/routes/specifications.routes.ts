import { Router } from 'express'
import { SpecificationsController } from '../controllers/SpecificationsController'

const specificationsRouter = Router()
const categoriesController = new SpecificationsController()

specificationsRouter.post('/', categoriesController.create)

export { specificationsRouter }
