import internal from "stream";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 200 })
  customer_name: string;

  @Column({ length: 50 })
  customer_grade: string;
}
