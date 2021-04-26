import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'
import { UserToken } from '../infra/typeorm/entities/UsersTokens'

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(
    id: string,
    refresh_token: string
  ): Promise<UserToken | undefined>
  delete(id: string): Promise<void>
}
