import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
  update(user: User): Promise<User>
}

export { IUsersRepository }
