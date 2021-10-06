import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedPaymentAtField1633128779800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD COLUMN "payed_at" timestamp with time zone NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "payed_at"`);
  }
}
