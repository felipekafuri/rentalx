import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { deleteFile } from '@utils/file'

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
