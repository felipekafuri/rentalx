import { AppError } from '@errors/AppError'
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository'
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { InMemoryMailProvider } from '@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let inMemoryUsersRepository: InMemoryUsersRepository
let dateProvider: DayjsDateProvider
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository
let mailProvider: InMemoryMailProvider

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    dateProvider = new DayjsDateProvider()
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository()
    mailProvider = new InMemoryMailProvider()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send forgot password mail to user.', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail')

    await inMemoryUsersRepository.create({
      driver_license: '850652',
      email: 'escicul@epeofupu.sa',
      name: 'Estelle Porter',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('escicul@epeofupu.sa')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send forgot password mail to a inexistent user.', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('escicul@epeofupu.sa')
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a user token', async () => {
    const generateTokenMail = spyOn(inMemoryUsersTokensRepository, 'create')

    await inMemoryUsersRepository.create({
      driver_license: '850652',
      email: 'escicul@epeofupu.sa',
      name: 'Estelle Porter',
      password: '1234'
    })

    await sendForgotPasswordMailUseCase.execute('escicul@epeofupu.sa')

    expect(generateTokenMail).toHaveBeenCalled()
  })
})
