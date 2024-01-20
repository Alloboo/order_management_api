import OrderHistoryRepository from "../repositories/monthly-sales.repository";
import { OrderHistory } from "../entities/order-history.entity";

class MonthlySalesService {
  static async calculateMonthlySales(): Promise<Record<string, string>> {
    // OrderHistoryRepository 인스턴스 생성
    const orderHistoryRepository = new OrderHistoryRepository();

    try {
      // 저장소에서 모든 주문 세부 정보 조회
      const orders: OrderHistory[] = await orderHistoryRepository.findAll();
      // 월간 데이터를 저장할 객체 초기화
      const monthlyData: Record<
        string,
        Record<
          string,
          { orderAmount: number; refundAmount: number; totalSales: number }
        >
      > = {};

      // 주문 내역을 반복하여 월간 데이터 계산
      orders.forEach((order) => {
        // 주문일로부터 연도와 월 추출
        const orderDate = new Date(order.order_date);
        const year = orderDate.getFullYear().toString();
        const month = (orderDate.getMonth() + 1).toString();

        // 해당 연도에 데이터가 없으면 초기화
        if (!monthlyData[year]) {
          monthlyData[year] = {};
        }
        // 해당 월에 데이터가 없으면 초기화
        if (!monthlyData[year][month]) {
          monthlyData[year][month] = {
            orderAmount: 0,
            refundAmount: 0,
            totalSales: 0,
          };
        }

        // 주문 유형에 따라 데이터 업데이트
        if (order.order_type === "order") {
          monthlyData[year][month].orderAmount += +order.order_amount;
        } else if (order.order_type === "refund") {
          monthlyData[year][month].orderAmount += +order.order_amount;
          monthlyData[year][month].refundAmount += +order.order_amount;
        }
      });

      // 주문 및 환불 금액을 기반으로 총 매출 계산
      for (const year in monthlyData) {
        for (const month in monthlyData[year]) {
          const data = monthlyData[year][month];
          data.totalSales = data.orderAmount - data.refundAmount;
        }
      }

      // 누적된 숫자 값을 포맷팅된 문자열로 변환
      const formattedMonthlyData: Record<string, string> = {};
      for (const year in monthlyData) {
        for (const month in monthlyData[year]) {
          const data = monthlyData[year][month];
          formattedMonthlyData[
            `${year}년 ${getMonthName(Number(month))} 주문액`
          ] = data.orderAmount.toLocaleString();
          formattedMonthlyData[
            `${year}년 ${getMonthName(Number(month))} 환불액`
          ] = data.refundAmount.toLocaleString();
          formattedMonthlyData[
            `${year}년 ${getMonthName(Number(month))} 매출`
          ] = data.totalSales.toLocaleString();
        }
      }

      // 계산 및 포맷팅된 월간 데이터 반환
      return formattedMonthlyData;
    } catch (error) {
      console.error("데이터를 검색하는 중 오류가 발생했습니다:", error);
      throw error;
    }
  }
}

// 월 번호를 월 이름으로 변환하기 위한 도우미 함수
function getMonthName(monthNumber: number): string {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return months[monthNumber - 1];
}

export default MonthlySalesService;
