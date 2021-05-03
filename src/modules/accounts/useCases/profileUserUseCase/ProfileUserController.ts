import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ProfileUserUseCase } from './ProfileUserUseCase'

class ProfileUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request

    const profileUserUseCase = container.resolve(ProfileUserUseCase)

    const user = await profileUserUseCase.execute(user_id)

    return response.json(classToClass(user))
  }
}

export { ProfileUserController }
