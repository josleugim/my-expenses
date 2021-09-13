import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.expenses)
  category: Category;
}
