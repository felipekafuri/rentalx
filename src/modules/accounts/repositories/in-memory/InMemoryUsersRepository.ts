import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = []

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, data)

    this.users.push(user)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)

    return user
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(u => u.id === user.id)

    this.users[findIndex] = user

    return user
  }
}

export { InMemoryUsersRepository }
