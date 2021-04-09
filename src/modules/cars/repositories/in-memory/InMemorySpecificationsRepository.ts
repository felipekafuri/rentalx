import { ICreateSpecificationDTO } from '@modules/cars/dtos/ISpecificationDTO'
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { ISpecificationRepository } from '../ISpecificationsRepository'

class InMemorySpecificationsRepository implements ISpecificationRepository {
  specifications: Specification[] = []

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, data)

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(spec => spec.name === name)

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(spec =>
      ids.includes(spec.id)
    )
    return specifications
  }
}

export { InMemorySpecificationsRepository }
