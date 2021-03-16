import { ICreateSpecificationDTO } from '../dtos/ISpecificationDTO'
import { Specification } from '../entities/Specification'

interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): void
  findByName(name: string): Specification | undefined
}

export { ISpecificationRepository }
