import { ICarDTO } from '@modules/cars/dtos/ICarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Repository, getRepository } from 'typeorm'
import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>

  constructor() {
    this.ormRepository = getRepository(Car)
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate
  }: ICarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate
    })

    await this.ormRepository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.ormRepository.findOne({ where: { license_plate } })

    return car
  }
}

export { CarsRepository }
