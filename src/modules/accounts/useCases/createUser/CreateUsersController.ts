import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUsersUseCase } from './CreateUsersUseCase'

class CreateUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, driver_license, password } = request.body

    const createUserUseCase = container.resolve(CreateUsersUseCase)

    const user = await createUserUseCase.execute({
      email,
      name,
      driver_license,
      password
    })

    return response.status(201).json(classToClass(user))
  }
}

export { CreateUsersController }
