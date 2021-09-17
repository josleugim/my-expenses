import { Module } from '@nestjs/common';
import { PaymentType } from './entities/paymentType.entity';
import { PaymentTypeController } from './payment-type.controller';
import { PaymentTypeService } from './payment-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
