import { getRepository } from "typeorm";
import { OrderHistory } from "../entities/order-history.entity";

class OrderListRepository {
  static async findByFilters({
    startDate,
    endDate,
    orderType,
    customerId,
  }: {
    startDate?: string;
    endDate?: string;
    orderType?: number;
    customerId?: number;
  }): Promise<any[]> {
    try {
      // OrderHistory 엔터티에 대한 레포지토리 가져오기
      const orderRepository = getRepository(OrderHistory);

      // customer_id 기준으로 Customer 테이블과 OrderHistory 테이블 조인하는 쿼리 생성
      const queryBuilder = orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.customer", "customer") // Customer 테이블과 조인
        .select([
          "order.order_date", // OrderHistory의 주문 날짜
          "customer.customer_name", // Customer 테이블에서의 고객 이름
          "customer.customer_grade", // Customer 테이블의 고객 등급
          "order.order_type", // OrderHistory의 주문 유형
          "order.order_amount", // OrderHistory의 주문 금액
        ]);

      // 필터 적용
      queryBuilder.where("1 = 1"); // 필요에 따라 조건 수정

      if (startDate) {
        queryBuilder.andWhere("order.order_date >= :startDate", { startDate });
      }

      if (endDate) {
        queryBuilder.andWhere("order.order_date <= :endDate", { endDate });
      }

      if (orderType !== undefined) {
        queryBuilder.andWhere("order.order_type = :orderType", { orderType });
      }

      if (customerId !== undefined) {
        queryBuilder.andWhere("order.customer_id = :customerId", {
          customerId,
        });
      }

      // 쿼리 실행
      const orders = await queryBuilder.getMany();

      if (orders.length === 0) {
        // 결과가 없는 경우 처리
        return [];
      }

      return orders;
    } catch (error) {
      console.error("Error in orderListRepository: ", error);
      throw error;
    }
  }
}

export default OrderListRepository;
