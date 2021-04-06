import { ICreateCategoryDTO } from '../../dtos/ICategoryDTO'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

class InMemoryCategoriesRepository implements ICategoriesRepository {
  categories: Category[] = []

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name)

    return category
  }

  public async list(): Promise<Category[]> {
    return this.categories
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category()

    Object.assign(category, data)

    this.categories.push(category)

    return category
  }
}

export { InMemoryCategoriesRepository }
