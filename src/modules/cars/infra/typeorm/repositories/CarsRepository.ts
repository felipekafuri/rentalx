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
    license_plate,
    specifications
  }: ICarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications
    })

    await this.ormRepository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.ormRepository.findOne({ where: { license_plate } })

    return car
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.ormRepository
      .createQueryBuilder('car')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('car.brand = :brand', { brand })
    }
    if (category_id) {
      carsQuery.andWhere('car.category_id = :category_id', { category_id })
    }
    if (name) {
      carsQuery.andWhere('car.name = :name', { name })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.ormRepository.findOne(id)

    return car
  }

  async update(car: Car): Promise<Car> {
    const updatedCar = await this.ormRepository.save(car)

    return updatedCar
  }

  async updateAvailability(id: string, available: boolean): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute()
  }
}

export { CarsRepository }
