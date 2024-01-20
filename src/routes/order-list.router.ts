import express from "express";
import OrderListController from "../controllers/order-list.controller";

const orderListRouter = express.Router();

orderListRouter.get("/all", OrderListController.getAllOrderList);

export default orderListRouter;
