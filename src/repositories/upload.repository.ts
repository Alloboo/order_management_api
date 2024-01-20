import { getRepository } from "typeorm";
import { Customer } from "../entities/customer.entity";
import { OrderHistory } from "../entities/order-history.entity";
import { excelNumericToDate } from "../utils";

export const uploadFileRepository = async (sheets: any[]) => {
  try {
    // 데이터베이스 엔터티 가져오기
    const customerRepository = getRepository(Customer);
    const orderRepository = getRepository(OrderHistory);

    // 각 시트를 처리
    for (let i = 0; i < sheets.length; i++) {
      const sheet = sheets[i];

      if (i === 0) {
        // 첫 번째 시트는 Customer 테이블에 대한 것
        const customerData = sheet.data.slice(1); // 헤더 행을 제외한 데이터 가져오기
        const endIndex = customerData.findIndex((row: any[]) =>
          row.every((cell) => cell === null || cell === "")
        );
        const filteredCustomerData =
          endIndex === -1 ? customerData : customerData.slice(0, endIndex); // 데이터가 있는 행만 추출
        await Promise.all(
          filteredCustomerData.map(async (row: any[]) => {
            const customer = customerRepository.create({
              customer_id: row[0],
              customer_name: row[1],
              customer_grade: row[2],
            });
            await customerRepository.save(customer);
          })
        );
      } else if (i === 1) {
        console.log("order-history");
        // 두 번째 시트는 OrderHistory 테이블에 대한 것
        const orderData = sheet.data.slice(1); // 헤더 행을 제외한 데이터 가져오기
        const endIndex = orderData.findIndex((row: any[]) =>
          row.every((cell) => cell === null || cell === "")
        );
        const filteredOrderData =
          endIndex === -1 ? orderData : orderData.slice(0, endIndex); // 데이터가 있는 행만 추출

        await Promise.all(
          filteredOrderData.map(async (row: any[]) => {
            const orderHistory = orderRepository.create({
              customer_id: row[0],
              order_date: excelNumericToDate(row[1]),
              order_type: row[2],
              order_amount: row[3],
            });
            await orderRepository.save(orderHistory);
          })
        );
      }
    }
  } catch (error) {
    console.error("Error in uploadFileRepository:", error);
    throw error;
  }
};
