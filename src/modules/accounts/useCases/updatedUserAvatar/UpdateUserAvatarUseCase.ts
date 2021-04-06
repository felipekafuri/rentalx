import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { deleteFile } from '../../../../utils/file'
import { User } from '../../entities/User'

import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequestDTO {
  user_id: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFile }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatarFile

    const updatedUser = await this.usersRepository.update(user)

    return updatedUser
  }
}

export { UpdateUserAvatarUseCase }
