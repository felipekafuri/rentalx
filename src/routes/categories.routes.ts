import { Router } from 'express'
import multer from 'multer'

import { CreateCategoriesController } from '../modules/cars/useCases/createCategory/CreateCategoriesController'
import { ImportCategoriesController } from '../modules/cars/useCases/importCategory/ImportCategoriesController'
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'

const categoriesRouter = Router()

const upload = multer({
  dest: './tmp'
})
const createCategoryController = new CreateCategoriesController()
const listCategoriesController = new ListCategoriesController()
const importCategoriesController = new ImportCategoriesController()

categoriesRouter.post('/', createCategoryController.handle)
categoriesRouter.get('/', listCategoriesController.handle)

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle
)

export { categoriesRouter }
