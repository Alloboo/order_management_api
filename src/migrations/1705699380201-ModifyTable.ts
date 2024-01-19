import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyTable1705699380201 implements MigrationInterface {
    name = 'ModifyTable1705699380201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` CHANGE \`customer_name\` \`customer_name\` varchar(200) NOT NULL`);
    }

}
