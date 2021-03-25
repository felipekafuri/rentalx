import { Router } from 'express'
import { categoriesRouter } from './categories.routes'
import { specificationsRouter } from './specifications.routes'
import { userRouter } from './users.routes'

const routes = Router()

routes.use('/categories', categoriesRouter)
routes.use('/users', userRouter)
routes.use('/specifications', specificationsRouter)

export { routes }
