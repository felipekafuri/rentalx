import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRentalUseCase'

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request
    const { car_id, expect_return_date } = request.body

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      car_id,
      expect_return_date,
      user_id
    })

    return response.json(rental)
  }
}

export { CreateRentalController }
