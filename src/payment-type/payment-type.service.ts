import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from './entities/paymentType.entity';
import { Repository } from 'typeorm';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectRepository(PaymentType)
    private paymentTypeRepository: Repository<PaymentType>,
  ) {}

  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeRepository.insert(createPaymentTypeDto);
  }

  findAll() {
    return this.paymentTypeRepository.find();
  }

  findOne(id: number) {
    return this.paymentTypeRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    const paymentType = await this.paymentTypeRepository.findOne({
      where: { id },
    });

    return this.paymentTypeRepository.save({
      ...paymentType,
      ...updatePaymentTypeDto,
    });
  }

  remove(id: string) {
    return this.paymentTypeRepository.delete(id);
  }
}
