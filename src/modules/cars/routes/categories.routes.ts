import { Router } from 'express'
import { createCategoriesController } from '../useCases/createCategory'
import { listCategoriesController } from '../useCases/listCategories'

const categoriesRouter = Router()

categoriesRouter.post('/', (request, response) =>
  createCategoriesController.handle(request, response)
)
categoriesRouter.get('/', (request, response) =>
  listCategoriesController.handle(request, response)
)

export { categoriesRouter }
