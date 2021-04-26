import auth from '@config/auth'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../../errors/AppError'

interface IPayload {
  sub: string
  iat: string
  exp: string
}

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization
  const userTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError('Token is required.', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload

    const userToken = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    )

    if (!userToken) {
      throw new AppError('User not found.', 401)
    }

    request.user_id = user_id

    next()
  } catch {
    throw new AppError('Invalid token.', 401)
  }
}
