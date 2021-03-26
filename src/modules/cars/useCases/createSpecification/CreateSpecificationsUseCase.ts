import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { ISpecificationRepository } from '../../repositories/ISpecificationsRepository'

interface IRequestDTO {
  name: string
  description: string
}

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  public async execute({ name, description }: IRequestDTO): Promise<void> {
    const specificationExists = await this.specificationsRepository.findByName(
      name
    )

    if (specificationExists) {
      throw new AppError('Specification already exists.')
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationsUseCase }
