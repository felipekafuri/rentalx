import { ICarDTO } from '../../dtos/ICarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = []

  async create(data: ICarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      ...data,
      created_at: new Date(),
      available: true
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.license_plate === license_plate)

    return car
  }
}

export { InMemoryCarsRepository }
