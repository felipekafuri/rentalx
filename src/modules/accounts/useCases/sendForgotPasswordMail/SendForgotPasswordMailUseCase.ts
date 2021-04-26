import { AppError } from '@errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRespoitory'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { inject, injectable } from 'tsyringe'
import { v4 } from 'uuid'
import path from 'path'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    )

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const token = v4()
    const expiration_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expiration_date
    })
    const variable = {
      name: user.name,
      link: `${process.env.FORGOT_PASSWORD_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variable,
      templatePath
    )
  }
}

export { SendForgotPasswordMailUseCase }
