export class CreateExpenseDto {
  entry: string;
  amount: number;
  isActive?: boolean;
  categoryId: number;
  paymentTypeId: string;
}
