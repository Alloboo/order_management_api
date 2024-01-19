import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCustomerNullable1705701749908 implements MigrationInterface {
    name = 'ModifyCustomerNullable1705701749908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NOT NULL`);
    }

}
