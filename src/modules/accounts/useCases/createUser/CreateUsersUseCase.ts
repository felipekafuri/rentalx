import { inject, injectable } from 'tsyringe'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequestDTO {
  email: string
  name: string
  username: string
  password: string
  driver_license: string
}

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    email,
    name,
    username,
    password,
    driver_license
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.create({
      email,
      name,
      driver_license,
      password,
      username
    })

    return user
  }
}

export { CreateUsersUseCase }
