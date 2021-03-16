import { Router } from 'express'
import { createCategoriesController } from '../useCases/createCategory'
import { listCategoriesController } from '../useCases/listCategories'

const categoriesRouter = Router()

categoriesRouter.post('/', createCategoriesController.handle)
categoriesRouter.get('/', listCategoriesController.handle)

export { categoriesRouter }
