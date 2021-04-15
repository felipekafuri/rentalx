import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findByCarId(car_id: string): Promise<Rental | undefined>
  findByUserId(user_id: string): Promise<Rental | undefined>
  findById(id: string): Promise<Rental | undefined>
  update(rental: Rental): Promise<Rental>
  findAllByUserId(user_id: string): Promise<Rental[]>
}
