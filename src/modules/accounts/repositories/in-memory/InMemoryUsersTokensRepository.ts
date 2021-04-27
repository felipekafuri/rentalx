import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UsersTokens'
import { IUsersTokensRepository } from '../IUsersTokensRespoitory'

class InMemoryUsersTokensRepository implements IUsersTokensRepository {
  usersTokens: UserToken[] = []

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, data)

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      userToken =>
        userToken.id === id && userToken.refresh_token === refresh_token
    )

    return userToken
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.usersTokens.findIndex(
      userToken => userToken.id === id
    )

    this.usersTokens.splice(findIndex, 1)
  }

  async findByToken(refresh_token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      userToken => userToken.refresh_token === refresh_token
    )

    return userToken
  }
}

export { InMemoryUsersTokensRepository }
