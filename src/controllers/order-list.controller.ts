import { Request, Response } from "express";
import OrderListService from "../services/order-list.service";

class OrderListController {
  static async getOrderList(req: Request, res: Response): Promise<void> {
    try {
      // 쿼리 매개변수 추출
      const { startDate, endDate, orderType, customerId, pageSize, pageNo } =
        req.query;

      // 필터 및 페이지네이션하여 주문 목록 가져오기
      const orders = await OrderListService.getOrderList({
        startDate: startDate as string,
        endDate: endDate as string,
        orderType: orderType ? parseInt(orderType as string, 10) : undefined,
        customerId: customerId ? parseInt(customerId as string, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize as string, 10) : undefined,
        pageNo: pageNo ? parseInt(pageNo as string, 10) : undefined,
      });

      const result = orders.length !== 0 ? orders : { msg: "No orders found" };
      res.status(200).json(result);
    } catch (error) {
      console.error("요청 처리 중 오류가 발생했습니다:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default OrderListController;
