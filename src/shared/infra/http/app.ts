import 'reflect-metadata'
import createConnection from '@shared/infra/typeorm'
import '@shared/container'
import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import { AppError } from '@errors/AppError'
import { routes } from '@shared/infra/http/routes'

import swaggerFile from '../../../swagger.json'

createConnection()
const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message })
    }

    return response
      .status(500)
      .json({ message: `Internal Server Error - ${err.message}` })
  }
)

export { app }