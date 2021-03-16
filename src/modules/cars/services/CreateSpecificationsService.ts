import { ISpecificationRepository } from '../repositories/ISpecificationsRepository'

interface IRequestDTO {
  name: string
  description: string
}

class CreateSpecificationsService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  public execute({ name, description }: IRequestDTO): void {
    const specificationExists = this.specificationsRepository.findByName(name)

    if (specificationExists) {
      throw new Error('Specification already exists.')
    }

    this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationsService }
