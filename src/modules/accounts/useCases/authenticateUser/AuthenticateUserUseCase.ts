import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRespoitory'
import auth from '@config/auth'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

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
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
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

    const { expiresIn } = auth
    const token = sign({}, String(process.env.APP_SECRET), {
      subject: userExists.id,
      expiresIn
    })

    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days
    } = auth

    const refresh_token = sign(
      {
        email
      },
      secret_refresh_token,
      {
        subject: userExists.id,
        expiresIn: expires_in_refresh_token
      }
    )

    const refresh_token_expiration_date = this.dateProvider.addDays(
      expires_in_refresh_token_days
    )
    await this.usersTokensRepository.create({
      expiration_date: refresh_token_expiration_date,
      refresh_token,
      user_id: userExists.id
    })

    return {
      user: userExists,
      token,
      refresh_token
    }
  }
}

export { AuthenticateUserUseCase }
