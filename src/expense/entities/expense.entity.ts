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

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'payment_type_id' })
  paymentTypeId: string;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.expenses)
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentType;
}
