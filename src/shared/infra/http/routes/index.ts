import { Router } from 'express'
import { authenticationRouter } from './authenticate.routes'
import { carsRouter } from './cars.routes'
import { categoriesRouter } from './categories.routes'
import { rentalRouter } from './rentals.routes'
import { specificationsRouter } from './specifications.routes'
import { userRouter } from './users.routes'

const routes = Router()

routes.use('/categories', categoriesRouter)
routes.use('/rentals', rentalRouter)
routes.use('/users', userRouter)
routes.use('/specifications', specificationsRouter)
routes.use('/sessions', authenticationRouter)
routes.use('/cars', carsRouter)

export { routes }
