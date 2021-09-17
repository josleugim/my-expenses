import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment-types')
export class PaymentType {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  created_at: string;

  @Column({ default: true })
  isActive: boolean;
}
