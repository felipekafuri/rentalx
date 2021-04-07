import { CreateCarUseCase } from './CreateCarUseCase'
import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository'
import { AppError } from '@errors/AppError'

let createCarUseCase: CreateCarUseCase
let inMemoryCarsRepository: InMemoryCarsRepository

describe('Create Car', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository)
  })

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with existent license plate', async () => {
    await createCarUseCase.execute({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    await expect(
      createCarUseCase.execute({
        name: 'Polo',
        description: 'Super fast',
        daily_rate: 10,
        license_plate: '99999999',
        brand: 'Volkswagem',
        category_id: '123456789',
        fine_amount: 2000000000
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    expect(car.available).toBe(true)
  })
})
