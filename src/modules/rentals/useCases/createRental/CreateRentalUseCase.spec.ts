import { AppError } from '@errors/AppError'
import { InMemoryRentalRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalRepository'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let inMemoryRentalRepository: InMemoryRentalRepository
let dayJsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository()
    dayJsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      dayJsDateProvider,
      inMemoryRentalRepository
    )
  })

  it('should be able to  create a new rental', async () => {
    const twoDaysBefore = new Date().getDate() + 2
    const fakeDate = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), twoDaysBefore)
    )

    const rental = await createRentalUseCase.execute({
      car_id: '1234',
      user_id: '121212',
      expect_return_date: fakeDate
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental to the same car', async () => {
    const twoDaysBefore = new Date().getDate() + 2
    const fakeDate = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), twoDaysBefore)
    )
    await createRentalUseCase.execute({
      car_id: '23452345',
      user_id: '121212',
      expect_return_date: fakeDate
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '23452345',
        user_id: '121212',
        expect_return_date: fakeDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental to the same user', async () => {
    const twoDaysBefore = new Date().getDate() + 2
    const fakeDate = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), twoDaysBefore)
    )

    await inMemoryRentalRepository.create({
      car_id: '2345236',
      user_id: '121212',
      expect_return_date: fakeDate
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '1234',
        user_id: '121212',
        expect_return_date: fakeDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    const twoDaysAgo = new Date().getDate() - 2
    const fakeDate = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), twoDaysAgo)
    )

    await expect(
      createRentalUseCase.execute({
        car_id: '1234',
        user_id: '121212',
        expect_return_date: fakeDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
