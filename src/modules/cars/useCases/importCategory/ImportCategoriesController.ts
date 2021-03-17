import { Request, Response } from 'express'
import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'

class ImportCategoriesController {
  constructor(private importCategoryUseCase: ImportCategoriesUseCase) {}

  public handle(request: Request, response: Response): Response {
    try {
      const { file } = request

      this.importCategoryUseCase.execute(file)

      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { ImportCategoriesController }
