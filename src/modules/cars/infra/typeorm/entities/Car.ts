import { v4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('cars')
class Car {
  @PrimaryColumn('uuid')
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  daily_rate: number

  @Column()
  license_plate: string

  @Column()
  fine_amount: number

  @Column()
  available: boolean

  @Column()
  brand: string

  @Column()
  category_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { Car }
