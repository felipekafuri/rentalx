import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../IRentalsRepository'

class InMemoryRentalRepository implements IRentalsRepository {
  private rentals: Rental[] = []

  async create({
    car_id,
    expect_return_date,
    user_id
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      car_id,
      expect_return_date,
      user_id,
      start_date: new Date(),
      end_date: new Date()
    })

    this.rentals.push(rental)

    return rental
  }

  async findByCarId(car_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(r => r.car_id === car_id)

    return rental
  }

  async findByUserId(user_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(r => r.user_id === user_id)

    return rental
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(r => r.id === id)

    return rental
  }

  async update(rental: Rental): Promise<Rental> {
    const findIndex = this.rentals.findIndex(r => r.id === rental.id)

    this.rentals[findIndex] = rental

    return rental
  }

  async findAllByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }
}

export { InMemoryRentalRepository }
