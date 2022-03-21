export class CreateExpenseDto {
  entry: string;
  amount: number;
  isActive?: boolean;
  category_id: number;
}
