import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { Repository, getRepository } from 'typeorm'
import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  ormRepository: Repository<Rental>

  constructor() {
    this.ormRepository = getRepository(Rental)
  }

  async create({
    car_id,
    expect_return_date,
    user_id
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      expect_return_date,
      user_id
    })

    await this.ormRepository.save(rental)

    return rental
  }

  async findByCarId(car_id: string): Promise<Rental | undefined> {
    const rental = await this.ormRepository.findOne({
      where: { car_id, end_date: null }
    })

    return rental
  }

  async findByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = await this.ormRepository.findOne({
      where: { user_id, end_date: null }
    })

    return rental
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.ormRepository.findOne(id)

    return rental
  }

  async update(rental: Rental): Promise<Rental> {
    await this.ormRepository.save(rental)

    return rental
  }

  async findAllByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.ormRepository.find({
      where: { user_id: user_id },
      relations: ['car']
    })

    return rentals
  }
}

export { RentalsRepository }
