import { MigrationInterface, QueryRunner } from "typeorm";

export class ADDEDUSETITEMRELATION1708079299370 implements MigrationInterface {
    name = 'ADDEDUSETITEMRELATION1708079299370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD "created_by_id" uuid`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_87551e041c180c6bea8400f9460" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_87551e041c180c6bea8400f9460"`);
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "created_by_id"`);
    }

}
