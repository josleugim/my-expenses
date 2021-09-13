import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Expense } from '../../expense/entities/expense.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  created_at: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses: Expense[];
}
