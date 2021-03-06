import { AppError } from '@errors/AppError'
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository'
import { InMemoryUsersTokensRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

import { CreateUsersUseCase } from '../createUser/CreateUsersUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository
let dateProvider: DayjsDateProvider
let createUsersUseCase: CreateUsersUseCase
describe('Authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository()
    createUsersUseCase = new CreateUsersUseCase(inMemoryUsersRepository)
    dateProvider = new DayjsDateProvider()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider
    )
  })

  it('should be able to authenticate a user', async () => {
    await createUsersUseCase.execute({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      driver_license: '9999999999'
    })

    const result = await authenticateUserUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '12345678'
    })

    expect(result).toHaveProperty('token')
    expect(result).toHaveProperty('user')
  })

  it('should not be able to authenticate a non existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', async () => {
    await createUsersUseCase.execute({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
      driver_license: '9999999999'
    })

    await expect(
      authenticateUserUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '12345'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
