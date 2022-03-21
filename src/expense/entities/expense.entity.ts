import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
