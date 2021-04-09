import { Router } from 'express'
import multer from 'multer'

import { CreateCategoriesController } from '@modules/cars/useCases/createCategory/CreateCategoriesController'
import { ImportCategoriesController } from '@modules/cars/useCases/importCategory/ImportCategoriesController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'

import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin'

const categoriesRouter = Router()

const upload = multer({
  dest: './tmp'
})
const createCategoryController = new CreateCategoriesController()
const listCategoriesController = new ListCategoriesController()
const importCategoriesController = new ImportCategoriesController()

categoriesRouter.post(
  '/',
  ensureAuthentication,
  ensureIsAdmin,
  createCategoryController.handle
)
categoriesRouter.get('/', listCategoriesController.handle)

categoriesRouter.post(
  '/import',
  ensureAuthentication,
  ensureIsAdmin,
  upload.single('file'),
  importCategoriesController.handle
)

export { categoriesRouter }
