import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expense } from '../../expense/entities/expense.entity';

@Entity('payment_types')
export class PaymentType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  created_at: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Expense, (expense) => expense.paymentType)
  expenses: Expense[];
}
