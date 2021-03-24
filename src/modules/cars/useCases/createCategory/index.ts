import { CreateCategoriesController } from './CreateCategoriesController'
import { CreateCategoriesUseCase } from './CreateCategoriesUseCase'
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository'

export default (): CreateCategoriesController => {
  const categoriesRepository = new CategoriesRepository()

  const createCategoryUseCase = new CreateCategoriesUseCase(
    categoriesRepository
  )

  const createCategoriesController = new CreateCategoriesController(
    createCategoryUseCase
  )

  return createCategoriesController
}
