import { AppError } from '@errors/AppError'
import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository'
import { InMemorySpecificationsRepository } from '@modules/cars/repositories/in-memory/InMemorySpecificationsRepository'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let inMemoryCarsRepository: InMemoryCarsRepository
let inMemorySpecificationsRepository: InMemorySpecificationsRepository
describe('Create car specifications', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository
    )
  })

  it('should be able to create a car specification', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    const specification = await inMemorySpecificationsRepository.create({
      name: 'asdfgaqwerg',
      description: 'qrgtwergawqrsg'
    })

    const specifications_id = [specification.id]

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    })

    expect(carSpecifications).toHaveProperty('specifications')
    expect(carSpecifications.specifications.length).toBe(1)
  })

  it('should not be able to add a new specification to a inexistent car', async () => {
    const car_id = '123456789'
    const specifications_id = ['2345']

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toBeInstanceOf(AppError)
  })
})
