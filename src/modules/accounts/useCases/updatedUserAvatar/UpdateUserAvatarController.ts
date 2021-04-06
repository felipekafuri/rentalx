import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request
    const { filename: avatarFile } = request.file

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    const updatedUser = await updateUserAvatarUseCase.execute({
      user_id,
      avatarFile
    })

    return response.status(204).send(classToClass(updatedUser))
  }
}

export { UpdateUserAvatarController }
