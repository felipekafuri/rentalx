import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRespoitory'
import { Repository, getRepository } from 'typeorm'
import { UserToken } from '../entities/UsersTokens'

class UsersTokensRepository implements IUsersTokensRepository {
  ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = getRepository(UserToken)
  }

  async create({
    expiration_date,
    refresh_token,
    user_id
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      expiration_date,
      refresh_token,
      user_id
    })

    await this.ormRepository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { user_id: id, refresh_token }
    })

    return userToken
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  async findByToken(refresh_token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { refresh_token }
    })

    return userToken
  }
}

export { UsersTokensRepository }
