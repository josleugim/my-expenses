import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { PaymentType } from '../../payment-type/entities/paymentType.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  entry: string;

  @Column()
  amount: number;

  @Column()
  created_at: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz' })
  payed_at: string;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  paymentTypeId: string;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.expenses)
  paymentType: PaymentType;
}
