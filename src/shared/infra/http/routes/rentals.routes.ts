import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController'
import { Router } from 'express'
import { ensureAuthentication } from '../middlewares/ensureAuthentication'

const rentalRouter = Router()

const createRentalController = new CreateRentalController()

rentalRouter.post('/', ensureAuthentication, createRentalController.handle)
rentalRouter.get('/', ensureAuthentication, (request, response) => {
  return response.json({ ok: true })
})

export { rentalRouter }
