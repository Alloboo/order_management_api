import "dotenv/config";
import "./db";
import app from "./app";
import { AppDataSource } from "./db";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT}`);
};

AppDataSource.initialize().then(() => console.log("✅ DB Connection"));

app.listen(PORT, handleListening);
