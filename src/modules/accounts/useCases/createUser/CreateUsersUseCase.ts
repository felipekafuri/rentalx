import { inject, injectable } from 'tsyringe'
import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { hash } from 'bcryptjs'
import { AppError } from '../../../../errors/AppError'

interface IRequestDTO {
  email: string
  name: string
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
    password,
    driver_license
  }: IRequestDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('User already exists.')
    }
    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      email,
      name,
      driver_license,
      password: hashedPassword
    })

    return user
  }
}

export { CreateUsersUseCase }
