import { getRepository, Repository } from 'typeorm'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async create({
    name,
    driver_license,
    email,
    password,
    username
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      username,
      email,
      driver_license,
      password
    })

    await this.ormRepository.save(user)

    return user
  }
}

export { UsersRepository }
