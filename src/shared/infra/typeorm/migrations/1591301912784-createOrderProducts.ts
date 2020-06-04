import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderProducts1591301912784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'order_id',
            type: 'uuid'
          },
          {
            name: 'product_id',
            type: 'uuid'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'quantity',
            type: 'int'
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
      await queryRunner.dropTable('orders_products');
    }
}
