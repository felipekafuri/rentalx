import { AppError } from '@errors/AppError'
import { InMemoryRentalRepository } from '@modules/rentals/repositories/in-memory/InMemoryRentalRepository'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let inMemoryRentalRepository: InMemoryRentalRepository

describe('Create Rental', () => {
  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository()

    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalRepository)
  })

  it('should be able to  create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '1234',
      user_id: '121212',
      expect_return_date: new Date()
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental to the same car', async () => {
    await createRentalUseCase.execute({
      car_id: '23452345',
      user_id: '121212',
      expect_return_date: new Date()
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '23452345',
        user_id: '121212',
        expect_return_date: new Date()
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental to the same user', async () => {
    await inMemoryRentalRepository.create({
      car_id: '2345236',
      user_id: '121212',
      expect_return_date: new Date()
    })

    await expect(
      createRentalUseCase.execute({
        car_id: '1234',
        user_id: '121212',
        expect_return_date: new Date()
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
