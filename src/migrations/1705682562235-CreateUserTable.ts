import { ConnectionOptions, MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1705682562235 implements MigrationInterface {
  name = "CreateUserTable1705682562235";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`customer\` (\`customer_id\` int NOT NULL AUTO_INCREMENT, \`customer_name\` varchar(200) NOT NULL, \`customer_grade\` varchar(50) NOT NULL, PRIMARY KEY (\`customer_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`order_history\` (\`order_id\` int NOT NULL AUTO_INCREMENT, \`customer_id\` int NOT NULL, \`order_date\` date NOT NULL, \`order_type\` enum ('order', 'refund') NOT NULL, \`order_amount\` decimal(10,2) NOT NULL, PRIMARY KEY (\`order_id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`customer\` ALTER COLUMN \`customer_name\` SET DEFAULT '기본이름'`
    );
    await queryRunner.query(
      `ALTER TABLE \`order_history\` ADD CONSTRAINT \`FK_7ec8834ccf79631a801ab032f94\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`customer_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_history\` DROP FOREIGN KEY \`FK_7ec8834ccf79631a801ab032f94\``
    );
    await queryRunner.query(`DROP TABLE \`order_history\``);
    await queryRunner.query(`DROP TABLE \`customer\``);
  }
}
