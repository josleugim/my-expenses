import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/entities/expense.entity';
import { ConfigModule } from '@nestjs/config';
import { StatisticModule } from './statistic/statistic.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { PaymentType } from './payment-type/entities/paymentType.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'expenses_dev',
      entities: [Category, Expense, PaymentType],
      synchronize: false,
      retryDelay: Number(process.env.PORT),
      retryAttempts: 5,
    }),
    CategoryModule,
    ExpenseModule,
    StatisticModule,
    PaymentTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
