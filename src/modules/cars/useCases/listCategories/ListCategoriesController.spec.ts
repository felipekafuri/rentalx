import { app } from '@shared/infra/http/app'
import request from 'supertest'

import createConnection from '@shared/infra/typeorm'
import { Connection } from 'typeorm'
import { hash } from 'bcryptjs'
import { v4 } from 'uuid'

let connection: Connection

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = v4()
    const password = await hash(String(process.env.ADMIN_PASSWORD), 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at, updated_at)
        values('${id}', 'FRK_ADMIN', 'admin@rentalx.com', '${password}', '999999999', true, 'now()', 'now()')
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list all available categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: process.env.ADMIN_PASSWORD
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Super Test',
        description: 'Category Super Test'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
