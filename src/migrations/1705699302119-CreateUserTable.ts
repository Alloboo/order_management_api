import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1705699302119 implements MigrationInterface {
    name = 'CreateUserTable1705699302119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NOT NULL`);
    }

}
