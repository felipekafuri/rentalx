import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'

class ImportCategoriesController {
  public handle(request: Request, response: Response): Response {
    try {
      const { file } = request

      const importCategoryUseCase = container.resolve(ImportCategoriesUseCase)

      importCategoryUseCase.execute(file)

      return response.status(201).send()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { ImportCategoriesController }
