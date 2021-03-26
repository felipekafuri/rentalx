import { classToClass } from 'class-transformer'
import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

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
    const { sub: user_id } = verify(
      token,
      String(process.env.APP_SECRET)
    ) as IPayload
    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.', 401)
    }

    next()
  } catch {
    throw new AppError('Invalid token.', 401)
  }
}
