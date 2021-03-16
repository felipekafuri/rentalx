import { ICreateCategoryDTO } from '../dtos/ICategoryDTO'
import { Category } from '../entities/Category'

interface ICategoriesRepository {
  findByName(name: string): Category | undefined
  list(): Category[]
  create(data: ICreateCategoryDTO): Category
}

export { ICategoriesRepository }
