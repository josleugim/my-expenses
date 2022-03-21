import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Raw, Repository } from 'typeorm';
import { FiltersExpenseDto } from './dto/filters-expense.dto';
import { CreateTermDto } from './dto/create-term.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    createExpenseDto.payed_at = moment();
    return this.expenseRepository.insert(createExpenseDto);
  }

  findAll(filters: FiltersExpenseDto) {
    const query: any = {};
    if (filters.categoryId) {
      query.categoryId = filters.categoryId;
    }

    if (filters.fromDate && filters.toDate) {
      query.created_at = Raw(
        (alias) =>
          `${alias} > '${filters.fromDate}' AND ${alias} < '${filters.toDate}'`,
      );
    }
    return this.expenseRepository.find({
      cache: true,
      relations: ['category', 'paymentType'],
      where: query,
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return this.expenseRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepository.findOne({
      where: { id },
    });

    return this.expenseRepository.save({
      ...expense,
      ...updateExpenseDto,
    });
  }

  remove(id: number) {
    return this.expenseRepository.delete(id);
  }

  createTerm(createTermDto: CreateTermDto) {
    const expense: CreateExpenseDto = {
      entry: createTermDto.entry,
      amount: createTermDto.amount,
      category_id: createTermDto.category_id,
      paymentTypeId: createTermDto.paymentTypeId,
      payed_at: moment(),
    };

    for (let i = 0; i < createTermDto.numberOfTerms; i++) {
      this.expenseRepository.insert(expense);
      expense.payed_at = moment(expense.payed_at).add(1, 'M');
    }
  }
}
