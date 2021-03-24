import { Request, Response } from 'express'
import { CreateCategoriesUseCase } from './CreateCategoriesUseCase'

class CreateCategoriesController {
  constructor(private createCategoryUseCase: CreateCategoriesUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const category = await this.createCategoryUseCase.execute({
        name,
        description
      })

      return response.status(201).json(category)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
export { CreateCategoriesController }
