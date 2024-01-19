import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnType1705700055243 implements MigrationInterface {
    name = 'ModifyColumnType1705700055243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NOT NULL`);
    }

}
