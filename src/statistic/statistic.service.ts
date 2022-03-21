import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '../expense/entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async getStatistics() {
    const start = new Date('03/01/2022');
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);

    const getTotalQuery = await this.expenseRepository
      .createQueryBuilder('expenses')
      .select('SUM(expenses.amount)', 'total')
      .where('expenses.isActive = :isActive', { isActive: true })
      .andWhere(
        `expenses.payed_at BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
      )
      .getRawOne();

    const groupedExpenses = await this.expenseRepository
      .createQueryBuilder('expenses')
      .select('cat.name', 'name')
      .addSelect('SUM(expenses.amount)', 'amount')
      .innerJoin('categories', 'cat', 'cat.id = expenses.category_id')
      .where('expenses.isActive = :isActive', { isActive: true })
      .andWhere(
        `expenses.payed_at BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
      )
      .groupBy('cat.name')
      .getRawMany();

    return groupedExpenses.map((item) => {
      item.percentage = Math.round(
        (Number(item.amount) * 100) / Number(getTotalQuery.total),
      );

      return item;
    });
  }
}
