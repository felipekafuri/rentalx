import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { v4 } from 'uuid'
import { User } from './User'

@Entity('users_tokens')
class UserToken {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  refresh_token: string

  @Column()
  expiration_date: Date

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { UserToken }
