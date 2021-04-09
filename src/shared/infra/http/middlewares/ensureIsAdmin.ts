import { AppError } from '@errors/AppError'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { Request, Response, NextFunction } from 'express'

export async function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request

  const usersRepository = new UsersRepository()

  const isUserAdmin = await usersRepository.findById(user_id)

  if (!isUserAdmin?.isAdmin) {
    throw new AppError('User is not and Admin.')
  }

  return next()
}
