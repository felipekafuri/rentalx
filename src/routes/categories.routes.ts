import { Router } from 'express'
import createCategoriesController from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'
import multer from 'multer'
import { importCategoriesController } from '../modules/cars/useCases/importCategory'

const categoriesRouter = Router()

const upload = multer({
  dest: './tmp'
})

categoriesRouter.post('/', (request, response) =>
  createCategoriesController().handle(request, response)
)
categoriesRouter.get('/', (request, response) =>
  listCategoriesController.handle(request, response)
)

categoriesRouter.post('/import', upload.single('file'), (request, response) =>
  importCategoriesController.handle(request, response)
)

export { categoriesRouter }
