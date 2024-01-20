import OrderListRepository from "../repositories/order-list.repository";

class OrderListService {
  // 전체 주문 목록 조회
  static async getAllOrderList(): Promise<any[]> {
    try {
      const orders = await OrderListRepository.getAllOrderList();

      // 가공된 데이터를 반환
      return orders.map((order) => ({
        order_date: order.order_date,
        customer_name: order.customer.customer_name,
        customer_grade: order.customer.customer_grade,
        order_type: order.order_type,
        order_amount: order.order_amount,
      }));
    } catch (error) {
      console.error("An error occurred while retrieving the order:", error);
      throw error;
    }
  }
}

export default OrderListService;
