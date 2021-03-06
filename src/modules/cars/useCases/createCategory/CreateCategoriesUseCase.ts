import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequestDTO {
  name: string
  description: string
}

@injectable()
class CreateCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({ name, description }: IRequestDTO): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new AppError('Category already exists')
    }

    const category = await this.categoriesRepository.create({
      name,
      description
    })

    return category
  }
}

export { CreateCategoriesUseCase }
