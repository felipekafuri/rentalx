import { v4 } from 'uuid'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'
import { Category } from './Category'
import { Specification } from './Specification'

@Entity('cars')
class Car {
  @PrimaryColumn('uuid')
  id: string

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

  @Column({ default: true })
  available: boolean

  @Column()
  brand: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  category_id: string

  @ManyToMany(() => Specification)
  @JoinTable({
    // Nome da tabela de relacionamento
    name: 'specifications_cars',
    // Nome da coluna na tabela de relacionamento que referencia a tabela que estamos
    joinColumns: [{ name: 'car_id' }],
    // Referencia a coluna da tabela de relacionamento que estamos colando aqui dentro
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}

export { Car }
