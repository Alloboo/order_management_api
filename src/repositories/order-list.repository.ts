import { getRepository } from "typeorm";
import { OrderHistory } from "../entities/order-history.entity";

class OrderListRepository {
  // 전체 주문 목록 조회
  static async getAllOrderList(): Promise<any[]> {
    try {
      // OrderHistory 엔터티에 대한 레포지토리 가져오기
      const orderRepository = getRepository(OrderHistory);

      // Customer 테이블과 OrderHistory 테이블을 customer_id를 기준으로 조인하는 쿼리 생성
      const queryBuilder = orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.customer", "customer") // Customer 테이블과 조인
        .select([
          "order.order_date", // OrderHistory에서의 주문 날짜
          "customer.customer_name", // Customer 테이블에서의 고객 이름
          "customer.customer_grade", // Customer 테이블에서의 고객 등급
          "order.order_type", // OrderHistory에서의 주문 유형
          "order.order_amount", // OrderHistory에서의 주문 금액
        ])
        .orderBy("order.order_date", "DESC"); // 주문 날짜를 내림차순으로 정렬

      // 쿼리 실행
      const orders = await queryBuilder.getMany();
      console.log(orders);
      return orders;
    } catch (error) {
      console.error("주문을 검색하는 동안 오류가 발생했습니다:", error);
      throw error;
    }
  }
}

export default OrderListRepository;
