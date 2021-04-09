import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

interface IRequestDTO {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, category_id, name }: IRequestDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable(
      brand,
      category_id,
      name
    )

    return cars
  }
}

export { ListCarsUseCase }
