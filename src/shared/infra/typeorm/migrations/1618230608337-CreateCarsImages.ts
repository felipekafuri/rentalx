import {
  MigrationInterface,
  QueryRunner,
  QueryRunnerAlreadyReleasedError,
  Table
} from 'typeorm'

export default class CreateCarsImages1618230608337
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_images',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'car_id', type: 'uuid' },
          { name: 'image_name', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          {
            name: 'FKCarsImages',
            referencedTableName: 'cars', // da onde ta vindo,
            referencedColumnNames: ['id'],
            columnNames: ['car_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_images')
  }
}
