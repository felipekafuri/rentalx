import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListCarsController } from '@modules/cars/useCases/listAvailablesCars/ListCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesContrller'

import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin'

const carsRouter = Router()
const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarsSpecificationController = new CreateCarSpecificationController()
const uploadCarsImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRouter.post(
  '/',
  ensureAuthentication,
  ensureIsAdmin,
  createCarController.handle
)

carsRouter.get('/', listCarsController.handle)

carsRouter.post(
  '/specifications/:id',
  ensureAuthentication,
  ensureIsAdmin,
  createCarsSpecificationController.handle
)

carsRouter.post(
  '/images/:id',
  ensureAuthentication,
  ensureIsAdmin,
  upload.array('images'),
  uploadCarsImagesController.handle
)

export { carsRouter }
