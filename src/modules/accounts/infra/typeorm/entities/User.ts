import { Exclude, Expose } from 'class-transformer'
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
  id: string

  @Column()
  name: string

  @Exclude()
  @Column()
  password: string

  @Column()
  email: string

  @Column()
  driver_license: string

  @Column()
  isAdmin: boolean

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: string

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    switch (process.env.DISK) {
      case 'local':
        return `https://localhost:3333/files/${this.avatar}`
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`

      default:
        return null
    }
  }

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { User }
