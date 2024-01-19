import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyOrderDateType1705700355254 implements MigrationInterface {
    name = 'ModifyOrderDateType1705700355254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_history\` DROP COLUMN \`order_date\``);
        await queryRunner.query(`ALTER TABLE \`order_history\` ADD \`order_date\` varchar(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_history\` DROP COLUMN \`order_date\``);
        await queryRunner.query(`ALTER TABLE \`order_history\` ADD \`order_date\` date NOT NULL`);
    }

}
