import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateRentals1618234476611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'car_id',
            type: 'uuid'
          },
          { name: 'user_id', type: 'uuid' },
          { name: 'start_date', type: 'timestamp', default: 'now()' },
          { name: 'end_date', type: 'timestamp', isNullable: true },
          { name: 'expect_return_date', type: 'timestamp', default: 'now()' },
          { name: 'total', type: 'numeric', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          {
            name: 'FKCarsRental',
            referencedTableName: 'cars', // da onde ta vindo,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FKUserRental',
            referencedTableName: 'users', // da onde ta vindo,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals')
  }
}
