import express from "express";
import OrderListController from "../controllers/order-list.controller";

const orderListRouter = express.Router();

orderListRouter.get("/", OrderListController.getOrderList);

export default orderListRouter;
