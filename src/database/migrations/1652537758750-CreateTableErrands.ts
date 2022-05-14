import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableErrands1652537758750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'errands',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'detailing',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('errands', true, true, true);
    }
}
