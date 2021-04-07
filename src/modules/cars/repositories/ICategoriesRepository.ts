import { ICreateCategoryDTO } from '../dtos/ICategoryDTO'
import { Category } from '../infra/typeorm/entities/Category'

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>
  list(): Promise<Category[]>
  create(data: ICreateCategoryDTO): Promise<Category>
}

export { ICategoriesRepository }
