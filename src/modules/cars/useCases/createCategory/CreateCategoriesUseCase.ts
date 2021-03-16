import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequestDTO {
  name: string
  description: string
}

class CreateCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public execute({ name, description }: IRequestDTO): Category {
    const categoryExists = this.categoriesRepository.findByName(name)

    if (categoryExists) {
      throw new Error('Category already exists')
    }

    const category = this.categoriesRepository.create({
      name,
      description
    })

    return category
  }
}

export { CreateCategoriesUseCase }
