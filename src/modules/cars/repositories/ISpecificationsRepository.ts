import { ICreateSpecificationDTO } from '../dtos/ISpecificationDTO'
import { Specification } from '../infra/typeorm/entities/Specification'

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification | undefined>
}

export { ISpecificationRepository }
