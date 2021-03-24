import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequestDTO {
  name: string
  description: string
}

class CreateCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute({ name, description }: IRequestDTO): Promise<Category> {
    const categoryExists = await this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new Error('Category already exists')
    }

    const category = await this.categoriesRepository.create({
      name,
      description
    })

    return category
  }
}

export { CreateCategoriesUseCase }
