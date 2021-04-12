import { getRepository, Repository } from 'typeorm'

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ISpecificationDTO'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository'

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

  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.ormRepository.create({ name, description })

    await this.ormRepository.save(specification)

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.ormRepository.findByIds(ids)

    return specifications
  }
}

export { SpecificationsRepository }
