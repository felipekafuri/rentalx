import { CreateCategoriesController } from './CreateCategoriesController'
import { CreateCategoriesUseCase } from './CreateCategoriesUseCase'
import { CategoriesRepository } from '../../repositories/CategoriesRepository'

const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoriesUseCase(categoriesRepository)

const createCategoriesController = new CreateCategoriesController(
  createCategoryUseCase
)
export { createCategoriesController }
