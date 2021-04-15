import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request
    const { id } = request.params

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRentalUseCase.execute({ id, user_id })

    return response.status(200).json(rental)
  }
}

export { DevolutionRentalController }