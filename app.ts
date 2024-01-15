import "reflect-metadata";
import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import morgan from "morgan";

import Router from "./src/router";

const app = express();
const logger = morgan("dev");

app.use(logger); // HTTP 메서드, 경로, 상태 코드 등을 확인 위한 미들웨어
app.use(express.json()); // json 파싱

app.use("/api", Router);

app.use((err: ErrorRequestHandler, _req: Request, res: Response) => {
  console.log("", err);
  res.json({ ok: false });
});

export default app;
