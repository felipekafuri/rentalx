import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ListCarsController } from '@modules/cars/useCases/listAvailablesCars/ListCarsController'
import { Router } from 'express'
import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'

const carsRouter = Router()
const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarsSpecificationController = new CreateCarSpecificationController()

carsRouter.post(
  '/',
  ensureAuthentication,
  ensureIsAdmin,
  createCarController.handle
)

carsRouter.get('/', listCarsController.handle)

carsRouter.post(
  '/specifications/:id',
  ensureAuthentication,
  ensureIsAdmin,
  createCarsSpecificationController.handle
)

export { carsRouter }
