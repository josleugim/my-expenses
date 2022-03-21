import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoryExpenseOneToMany1629484349580
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expenses" ADD "category_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_category_id"`,
    );
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "category_id"`);
  }
}
