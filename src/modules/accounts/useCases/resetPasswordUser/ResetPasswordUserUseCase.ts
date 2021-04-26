import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRespoitory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

interface IRequestDTO {
  password: string
  token: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ password, token }: IRequestDTO): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('Invalid token.')
    }

    if (
      this.dateProvider.isBefore(
        userToken.expiration_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError('Token is already expired.')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    user.password = await hash(password, 8)

    await this.usersRepository.update(user)

    await this.usersTokensRepository.delete(userToken.id)
  }
}

export { ResetPasswordUserUseCase }
