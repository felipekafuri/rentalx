import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async create({
    name,
    driver_license,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      driver_license,
      password
    })

    await this.ormRepository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ email })

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id)

    return user
  }

  async update(user: User): Promise<User> {
    this.ormRepository.save(user)

    return user
  }
}

export { UsersRepository }
