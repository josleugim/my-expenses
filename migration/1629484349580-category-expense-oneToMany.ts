import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoryExpenseOneToMany1629484349580
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expenses" ADD "categoryId" integer`);
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_categoryId" FOREIGN KEY ("categoryId") REFERENCES "categories"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" DROP CONSTRAINT "FK_categoryId"`,
    );
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "categoryId"`);
  }
}
