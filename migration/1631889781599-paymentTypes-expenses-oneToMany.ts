import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentTypesExpensesOneToMany1631889781599
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expenses" ADD "paymentTypeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_paymentTypeId" FOREIGN KEY ("paymentTypeId") REFERENCES "payment_types"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_paymentTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP COLUMN "paymentTypeId"`,
    );
  }
}
