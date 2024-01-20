import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./customer.entity";

enum OrderType {
  ORDER = "order",
  REFUND = "refund",
}

@Entity()
export class OrderHistory {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  customer_id: number;

  @ManyToOne(() => Customer, { onDelete: "CASCADE" })
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @Column({ type: "date" })
  order_date: Date;

  @Column({
    type: "enum",
    enum: OrderType,
  })
  order_type: OrderType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  order_amount: number;
}
