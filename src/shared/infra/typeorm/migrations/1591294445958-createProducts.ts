import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProducts1591294445958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true
          },
          {
            name: 'quantity',
            type: 'int'
          },
          {
            name: 'price',
            type: 'decimal',
            scale: 2,
            precision: 6
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('products');
    }

}
