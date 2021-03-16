import { Request, response, Response } from 'express'
import { SpecificationsRepository } from '../repositories/SpecificationsRepository'
import { CreateSpecificationsService } from '../services/CreateSpecificationsService'

const specificationsRepository = new SpecificationsRepository()

class SpecificationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body

      const createSpecifications = new CreateSpecificationsService(
        specificationsRepository
      )

      createSpecifications.execute({ name, description })

      return response.status(201).send()
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { SpecificationsController }
