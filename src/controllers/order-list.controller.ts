import { Request, Response } from "express";
import OrderListService from "../services/order-list.service";

class OrderListController {
  // 전체 주문 목록 조회
  static async getAllOrderList(req: Request, res: Response): Promise<void> {
    try {
      // OrderListService를 사용하여 모든 주문 목록 가져오기
      const orders = await OrderListService.getAllOrderList();

      // 쿼리 매개변수 추출
      let pageSize;
      let pageNo;

      if (!req.query) {
        pageSize = 50;
        pageNo = 1;
      } else {
        pageSize = req.query.pageSize;
        pageNo = req.query.pageNo;
      }

      // 페이지 번호 및 페이지 크기를 숫자로 변환
      const parsedPageNo = parseInt(pageNo as string, 10);
      const parsedPageSize = parseInt(pageSize as string, 10);

      // 제공되지 않은 경우 기본값이 적용됩니다.
      const effectivePageNo = isNaN(parsedPageNo) ? 1 : parsedPageNo;
      const effectivePageSize = isNaN(parsedPageSize) ? 50 : parsedPageSize;

      // 주문 목록을 페이지에 맞게 자르기
      const startIndex = (effectivePageNo - 1) * effectivePageSize;
      const endIndex = startIndex + effectivePageSize;
      const paginatedOrders = orders.slice(startIndex, endIndex);

      // JSON 형식으로 결과 응답
      res.json(paginatedOrders);
    } catch (error) {
      // 오류가 발생한 경우 적절한 오류 응답
      console.error("요청 처리 중 오류가 발생했습니다:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default OrderListController;
