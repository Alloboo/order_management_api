import "dotenv/config";
import app from "./app";

/* API 실행용 */
import { ConnectionOptions, createConnection } from "typeorm";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT}`);
};

const runServer = async () => {
  try {
    const connectionOptions: ConnectionOptions = {
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
    };

    const connection = await createConnection(connectionOptions);

    app.listen(PORT, handleListening);
    console.log("✅ Server started");
  } catch (error) {
    console.log("Error initializing TypeORM:", error);
  }
};

/* 마이그레이션 실행용*/
// import { AppDataSource } from "./ormconfig";

// const PORT = process.env.PORT;

// const handleListening = () => {
//   console.log(`✅ Server listening on port ${PORT}`);
// };

// const runServer = async () => {
//   try {
//     await AppDataSource.connect();

//     app.listen(PORT, handleListening);
//     console.log("✅ Server started");
//   } catch (error) {
//     console.log("Error initializing TypeORM:", error);
//   }
// };

runServer();
