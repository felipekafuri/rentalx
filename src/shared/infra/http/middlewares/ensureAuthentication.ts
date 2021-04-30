import auth from '@config/auth'
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

  if (!authHeader) {
    throw new AppError('Token is required.', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, auth.secret) as IPayload

    request.user_id = user_id

    next()
  } catch {
    throw new AppError('Invalid token.', 401)
  }
}
