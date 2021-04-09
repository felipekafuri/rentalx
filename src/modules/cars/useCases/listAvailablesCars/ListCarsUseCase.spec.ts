import { InMemoryCarsRepository } from '@modules/cars/repositories/in-memory/InMemoryCarsRepository'

import { ListCarsUseCase } from './ListCarsUseCase'

let listCarsUseCase: ListCarsUseCase
let inMemoryCarsRepository: InMemoryCarsRepository

describe('List Cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository)
  })

  it('should be able to list all available cars', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    const cars = await listCarsUseCase.execute({
      name: 'Polo'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list cars by brand', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    const cars = await listCarsUseCase.execute({
      brand: 'Volkswagem'
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list cars by category id', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Polo',
      description: 'Super fast',
      daily_rate: 10,
      license_plate: '99999999',
      brand: 'Volkswagem',
      category_id: '123456789',
      fine_amount: 2000000000
    })

    const cars = await listCarsUseCase.execute({
      category_id: '123456789'
    })

    expect(cars).toEqual([car])
  })
})
