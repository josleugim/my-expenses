export class CreateExpenseDto {
  entry: string;
  amount: number;
  isActive?: boolean;
  category_id: number;
  paymentTypeId: string;
  payed_at: any;
}
