import { ICarDTO } from '../dtos/ICarDTO'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarsRepository {
  create(data: ICarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car | undefined>
}

export { ICarsRepository }
