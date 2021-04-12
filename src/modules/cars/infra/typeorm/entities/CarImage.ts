import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('cars_images')
class CarImage {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  image_name: string

  @Column()
  car_id: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { CarImage }
