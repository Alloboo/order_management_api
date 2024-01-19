import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCustomerType1705702602981 implements MigrationInterface {
    name = 'ModifyCustomerType1705702602981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_grade\` \`customer_grade\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NULL`);
    }

}
