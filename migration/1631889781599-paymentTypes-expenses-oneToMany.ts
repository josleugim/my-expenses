import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentTypesExpensesOneToMany1631889781599
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD "payment_type_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_payment_type_id" FOREIGN KEY ("payment_type_id") REFERENCES "payment_types"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_payment_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP COLUMN "payment_type_id"`,
    );
  }
}
