import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { AppError } from '@errors/AppError'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRespoitory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const decode = verify(token, auth.secret_refresh_token)
    const { sub, email } = decode as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists.')
    }
    await this.usersTokensRepository.delete(userToken.id)

    const refresh_token_expiration_date = this.dateProvider.addDays(
      auth.expires_in_refresh_token_days
    )

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    await this.usersTokensRepository.create({
      expiration_date: refresh_token_expiration_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }
