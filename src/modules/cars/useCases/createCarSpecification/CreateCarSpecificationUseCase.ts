import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository'

interface IRequestDTO {
  car_id: string
  specifications_id: string[]
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  public async execute({
    car_id,
    specifications_id
  }: IRequestDTO): Promise<Car> {
    const car = await this.carsRepository.findById(car_id)

    if (!car) {
      throw new AppError('Car does not exist.')
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    )

    car.specifications = specifications

    await this.carsRepository.update(car)

    return car
  }
}

export { CreateCarSpecificationUseCase }
