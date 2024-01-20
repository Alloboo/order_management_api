import { getRepository, Repository } from "typeorm";
import { OrderHistory } from "../entities/order-history.entity";

class OrderHistoryRepository {
  private repository: Repository<OrderHistory>;
  static findAll: any;

  constructor() {
    this.repository = getRepository(OrderHistory);
  }

  // DB에서 모든 주문내역 가져오기
  async findAll(): Promise<OrderHistory[]> {
    return await this.repository.find();
  }
}

export default OrderHistoryRepository;
