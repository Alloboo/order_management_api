import "reflect-metadata";
import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import rootRouter from "./src/routes/root.router";

const app = express();
const logger = morgan("dev");

app.use(logger); // HTTP 메서드, 경로, 상태 코드 등을 확인 위한 미들웨어
app.use(express.json()); // json 파싱

// 라우터 등록
app.use("/", rootRouter);

// 에러처리 미들웨어
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.log("❌", err);
  res.json({ ok: false, msg: err.message});
});

export default app;
