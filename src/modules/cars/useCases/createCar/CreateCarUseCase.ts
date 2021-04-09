import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { AppError } from '@errors/AppError'

interface IRequestDTO {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    category_id,
    fine_amount
  }: IRequestDTO): Promise<Car> {
    // TODO Create verification if category exists (shouldn't be able to create a car with inexistent category)
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    )

    if (carAlreadyExists) {
      throw new AppError('Car already register')
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id
    })

    return car
  }
}

export { CreateCarUseCase }
