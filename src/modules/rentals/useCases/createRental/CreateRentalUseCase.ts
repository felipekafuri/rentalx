import { AppError } from '@errors/AppError'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { inject, injectable } from 'tsyringe'

interface IRequestDTO {
  user_id: string
  car_id: string
  expect_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expect_return_date
  }: IRequestDTO): Promise<Rental> {
    const rentalExists = await this.rentalsRepository.findByUserId(user_id)

    if (rentalExists && rentalExists.user_id === user_id) {
      throw new AppError('This user already rent a car.')
    }

    if (rentalExists && rentalExists.car_id === car_id) {
      throw new AppError('Rental for this car already exists')
    }

    const dateNow = this.dateProvider.dateNow()

    const differenceInHours = this.dateProvider.compareInHours(
      dateNow,
      expect_return_date
    )

    if (differenceInHours < 24) {
      throw new AppError('Invalid return time!')
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date
    })

    await this.carsRepository.updateAvailability(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }
