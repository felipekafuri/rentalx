import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase'

class ImportCategoriesController {
  public handle(request: Request, response: Response): Response {
    const { file } = request

    const importCategoryUseCase = container.resolve(ImportCategoriesUseCase)

    importCategoryUseCase.execute(file)

    return response.status(201).send()
  }
}

export { ImportCategoriesController }
