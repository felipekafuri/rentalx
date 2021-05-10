import { hash } from 'bcryptjs'
import { v4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  const id = v4()
  const password = await hash(String(process.env.ADMIN_PASSWORD), 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at, updated_at)
      values('${id}', 'FRK_ADMIN', 'admin@rentalx.com', '${password}', '999999999', true, 'now()', 'now()')
    `
  )
  await connection.close()
}

create().then(() => console.log('User admin created.'))
