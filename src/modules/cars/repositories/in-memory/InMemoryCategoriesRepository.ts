import { ICreateCategoryDTO } from '@modules/cars/dtos/ICategoryDTO'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

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
