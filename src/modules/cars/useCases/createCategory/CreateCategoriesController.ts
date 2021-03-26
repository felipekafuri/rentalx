import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCategoriesUseCase } from './CreateCategoriesUseCase'

class CreateCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const createCategoryUseCase = container.resolve(CreateCategoriesUseCase)

    const category = await createCategoryUseCase.execute({
      name,
      description
    })

    return response.status(201).json(category)
  }
}
export { CreateCategoriesController }
