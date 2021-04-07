import { AppError } from '@errors/AppError'
import { InMemoryCategoriesRepository } from '@modules/cars/repositories/in-memory/InMemoryCategoriesRepository'

import { CreateCategoriesUseCase } from './CreateCategoriesUseCase'

let inMemoryCategoriesRepository: InMemoryCategoriesRepository
let createCategory: CreateCategoriesUseCase

describe('Create category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository()
    createCategory = new CreateCategoriesUseCase(inMemoryCategoriesRepository)
  })

  it('should be able to create a category', async () => {
    const category = await createCategory.execute({
      name: 'Sedan',
      description: 'Categoria de carro Suv'
    })

    expect(category).toHaveProperty('id')
  })

  it('should not be able to create an existent category', async () => {
    await createCategory.execute({
      name: 'Sedan',
      description: 'Categoria de carro Suv'
    })

    await expect(
      createCategory.execute({
        name: 'Sedan',
        description: 'Categoria de carro Suv'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
