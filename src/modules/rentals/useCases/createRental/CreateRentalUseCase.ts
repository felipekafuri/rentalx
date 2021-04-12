import { AppError } from '@errors/AppError'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

interface IRequestDTO {
  user_id: string
  car_id: string
  expect_return_date: Date
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expect_return_date
  }: IRequestDTO): Promise<Rental> {
    const rentalExists = await this.rentalsRepository.findByUserId(user_id)

    if (rentalExists && rentalExists.user_id === user_id) {
      console.log('caiu user_id')
      throw new AppError('This user already rent a car.')
    }

    if (rentalExists && rentalExists.car_id === car_id) {
      console.log('caiu car_id')
      throw new AppError('Rental for this car already exists')
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }
