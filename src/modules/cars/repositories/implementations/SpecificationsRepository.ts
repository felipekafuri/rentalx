import { getRepository, Repository } from 'typeorm'
import { ICreateSpecificationDTO } from '../../dtos/ISpecificationDTO'
import { Specification } from '../../entities/Specification'
import { ISpecificationRepository } from '../ISpecificationsRepository'

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
