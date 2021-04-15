import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'
import { DevolutionRentalController } from '@modules/rentals/useCases/rentalDevolution/DevolutionRentalController'
import { Router } from 'express'
import { ensureAuthentication } from '../middlewares/ensureAuthentication'

const rentalRouter = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRouter.post('/', ensureAuthentication, createRentalController.handle)
rentalRouter.get(
  '/user',
  ensureAuthentication,
  listRentalsByUserController.handle
)
rentalRouter.post(
  '/devolution/:id',
  ensureAuthentication,
  devolutionRentalController.handle
)

export { rentalRouter }
