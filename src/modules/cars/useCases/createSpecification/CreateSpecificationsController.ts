import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSpecificationsUseCase } from './CreateSpecificationsUseCase'

class CreateSpecificationsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createSpecificationsUseCase = container.resolve(
        CreateSpecificationsUseCase
      )

      await createSpecificationsUseCase.execute({ name, description })

      return response.status(201).send()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { CreateSpecificationsController }
