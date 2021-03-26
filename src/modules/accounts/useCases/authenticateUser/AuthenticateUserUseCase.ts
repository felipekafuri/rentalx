import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { compare } from 'bcryptjs'
import { AppError } from '../../../../errors/AppError'

interface IRequestDTO {
  email: string
  password: string
}

interface IResponseDTO {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    email,
    password
  }: IRequestDTO): Promise<IResponseDTO> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (!userExists) {
      throw new AppError('Wrong email/password combination.')
    }

    const isPasswordCorrect = await compare(password, userExists.password)

    if (!isPasswordCorrect) {
      throw new AppError('Wrong email/password combination.')
    }

    const token = sign({}, String(process.env.APP_SECRET), {
      subject: userExists.id,
      expiresIn: '1d'
    })

    return {
      user: userExists,
      token
    }
  }
}

export { AuthenticateUserUseCase }
