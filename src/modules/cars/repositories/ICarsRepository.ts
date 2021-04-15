import { ICarDTO } from '../dtos/ICarDTO'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarsRepository {
  create(data: ICarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | undefined>
  findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>
  findById(id: string): Promise<Car | undefined>
  update(car: Car): Promise<Car>
  updateAvailability(id: string, available: boolean): Promise<void>
}

export { ICarsRepository }
