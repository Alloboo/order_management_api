import express from "express";
import uploadRouter from "./upload.router";
import monthlySalesRouter from "./monthly-sales.router";
import orderListRouter from "./order-history.router";

const rootRouter = express.Router();

rootRouter.use("/uploads", uploadRouter);
rootRouter.use("/monthlySales", monthlySalesRouter);
rootRouter.use("/orderHistories", orderListRouter);

// api 동작 확인
rootRouter.use("/", (req, res) => {
  try {
    res.status(200).json({ ok: true, msg: "API Root" });
  } catch (err) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

export default rootRouter;
