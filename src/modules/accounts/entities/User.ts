import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 } from 'uuid'

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  driver_license: string

  @Column()
  isAdmin: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: string

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { User }
