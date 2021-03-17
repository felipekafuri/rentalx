import { Router } from 'express'
import { createSpecificationsController } from '../modules/cars/useCases/createSpecification'

const specificationsRouter = Router()

specificationsRouter.post('/', (request, response) =>
  createSpecificationsController.create(request, response)
)

export { specificationsRouter }
