import { v4 } from 'uuid'
import { ICreateSpecificationDTO } from '../dtos/ISpecificationDTO'
import { Specification } from '../entities/Specification'
import { ISpecificationRepository } from './ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[]
  constructor() {
    this.specifications = []
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      specification => specification.name === name
    )

    return specification
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = {
      name,
      description,
      created_at: new Date()
    }

    this.specifications.push(specification)
  }
}

export { SpecificationsRepository }
