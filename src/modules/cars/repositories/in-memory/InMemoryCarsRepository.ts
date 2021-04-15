import { ICarDTO } from '../../dtos/ICarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class InMemoryCarsRepository implements ICarsRepository {
  private cars: Car[] = []
  private car1 = new Car()
  constructor() {
    this.car1 = Object.assign(this.car1, {
      name: 'Gol',
      description: 'Hyper fast',
      daily_rate: 15,
      license_plate: '23452346',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 124,
      available: false,
      created_at: new Date(),
      id: '123456'
    })

    this.cars.push(this.car1)
  }

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

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    let availableCars = this.cars.filter(car => car.available === true)

    if (brand || category_id || name) {
      availableCars = availableCars.filter(
        car =>
          car.brand === brand ||
          car.category_id === category_id ||
          car.name === name
      )
    }

    return availableCars
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.id === id)

    return car
  }

  async update(car: Car): Promise<Car> {
    const findIndex = this.cars.findIndex(c => c.id === car.id)

    this.cars[findIndex] = car

    return car
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(c => c.id === id)

    this.cars[findIndex].available = available
  }
}

export { InMemoryCarsRepository }
