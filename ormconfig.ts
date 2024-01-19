import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.SYNC === "dev" ? true : false,
  logging: true,
  entities: ["./src/entities/*.ts"],
  subscribers: ["./src/subscriber/**/*.ts"],
  migrationsRun: process.env.DB_MIGR === "dev" ? true : false,
  migrations: ["./src/migrations/*.ts"],
  migrationsTableName: "migrations",
});
