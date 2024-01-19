import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCustomerNOrderHistory1705701518933 implements MigrationInterface {
    name = 'ModifyCustomerNOrderHistory1705701518933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_history\` DROP COLUMN \`order_date\``);
        await queryRunner.query(`ALTER TABLE \`order_history\` ADD \`order_date\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_history\` DROP COLUMN \`order_date\``);
        await queryRunner.query(`ALTER TABLE \`order_history\` ADD \`order_date\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NULL`);
    }

}
