import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Raw, Repository } from "typeorm";
import { FiltersExpenseDto } from './dto/filters-expense.dto';
import { Category } from "../category/entities/category.entity";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
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
      relations: ['category'],
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

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return this.expenseRepository.delete(id);
  }
}
