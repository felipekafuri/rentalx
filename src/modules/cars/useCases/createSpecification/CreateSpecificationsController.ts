import { Request, Response } from 'express'
import { CreateSpecificationsUseCase } from './CreateSpecificationsUseCase'

class CreateSpecificationsController {
  constructor(
    private createSpecificationsUseCase: CreateSpecificationsUseCase
  ) {}

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      this.createSpecificationsUseCase.execute({ name, description })

      return response.status(201).send()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { CreateSpecificationsController }
