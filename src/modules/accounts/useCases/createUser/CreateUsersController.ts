import { Response, Request } from 'express'
import { container } from 'tsyringe'
import { CreateUsersUseCase } from './CreateUsersUseCase'

class CreateUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, username, driver_license, password } = request.body

    const createUserUseCase = container.resolve(CreateUsersUseCase)

    const user = await createUserUseCase.execute({
      name,
      email,
      username,
      driver_license,
      password
    })

    return response.status(201).json(user)
  }
}

export { CreateUsersController }
