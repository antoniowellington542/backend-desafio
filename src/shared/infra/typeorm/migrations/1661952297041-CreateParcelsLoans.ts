import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateParcelsLoans1661952297041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parcels_loans',
        columns: [
          {
            name: 'loan_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'parcel_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKLoanParcel',
            referencedTableName: 'loans',
            referencedColumnNames: ['id'],
            columnNames: ['loan_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKParcelLoan',
            referencedTableName: 'parcels',
            referencedColumnNames: ['id'],
            columnNames: ['parcel_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parcels_loans');
  }
}
