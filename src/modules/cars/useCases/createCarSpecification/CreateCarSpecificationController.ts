import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

class CreateCarSpecificationController {
  async handle(
    request: Request,
    response: Response,
    NextFunction: NextFunction
  ): Promise<Response> {
    const { id: car_id } = request.params

    const { specifications_id } = request.body

    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationUseCase
    )

    const car = await createCarSpecificationsUseCase.execute({
      car_id,
      specifications_id
    })

    return response.status(201).json(car)
  }
}

export { CreateCarSpecificationController }
