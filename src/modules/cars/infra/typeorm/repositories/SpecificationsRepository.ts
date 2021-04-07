import { ICreateSpecificationDTO } from '@modules/cars/dtos/ISpecificationDTO'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { getRepository, Repository } from 'typeorm'
import { Specification } from '../entities/Specification'

class SpecificationsRepository implements ISpecificationRepository {
  private ormRepository: Repository<Specification>

  constructor() {
    this.ormRepository = getRepository(Specification)
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.ormRepository.findOne({ name })

    return specification
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.ormRepository.create({ name, description })
    await this.ormRepository.save(specification)
  }
}

export { SpecificationsRepository }
