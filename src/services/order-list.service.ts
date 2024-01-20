import OrderListRepository from "../repositories/order-list.repository";

class OrderListService {
  static async getOrderList({
    startDate,
    endDate,
    orderType,
    customerId,
    pageSize = 50,
    pageNo = 1,
  }: {
    startDate?: string;
    endDate?: string;
    orderType?: number;
    customerId?: number;
    pageSize?: number;
    pageNo?: number;
  }): Promise<any[]> {
    try {
      // OrderListRepository를 사용하여 필터 및 페이지네이션을 기반으로 주문 목록 가져오기
      const orders = await OrderListRepository.findByFilters({
        startDate,
        endDate,
        orderType,
        customerId,
      });

      if (orders.length === 0) {
        // 결과가 없는 경우 처리
        return [];
      }

      // 페이지 번호 및 페이지 크기를 적용
      const startIndex = (pageNo - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedOrders = orders.slice(startIndex, endIndex);

      // 응답을 필요한 형식으로 변환
      const formattedOrders = paginatedOrders.map((order) => ({
        order_date: order.order_date,
        customer_name: order.customer.customer_name,
        customer_grade: order.customer.customer_grade,
        order_type: order.order_type,
        order_amount: order.order_amount,
      }));

      return formattedOrders;
    } catch (error) {
      console.error("Error in orderListService: ", error);
      throw error;
    }
  }
}

export default OrderListService;
