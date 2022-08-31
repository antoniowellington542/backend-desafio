import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateParcels1661950821129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parcels',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'loan_id',
            type: 'uuid',
          },
          {
            name: 'payValue',
            type: 'numeric',
          },
          {
            name: 'feesValue',
            type: 'numeric',
          },
          {
            name: 'valueWithFees',
            type: 'numeric',
          },
          {
            name: 'parcelValue',
            type: 'numeric',
          },
          {
            name: 'payDate',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'FKLoanId',
            referencedTableName: 'loans',
            referencedColumnNames: ['id'],
            columnNames: ['loan_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parcels');
  }
}
