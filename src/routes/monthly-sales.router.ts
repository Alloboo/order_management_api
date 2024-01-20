import express from "express";
import MonthlySalesController from "../controllers/monthly-sales.controller";
const monthlySalesRouter = express.Router();

monthlySalesRouter.get("/", MonthlySalesController.getMonthlySales);

export default monthlySalesRouter;
