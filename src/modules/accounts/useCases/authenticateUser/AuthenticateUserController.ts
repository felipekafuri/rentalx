import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const {
      user,
      token,
      refresh_token
    } = await authenticateUserUseCase.execute({
      email,
      password
    })

    return response
      .status(200)
      .json(classToClass({ user, token, refresh_token }))
  }
}

export { AuthenticateUserController }
