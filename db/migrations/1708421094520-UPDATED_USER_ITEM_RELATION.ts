import { MigrationInterface, QueryRunner } from "typeorm";

export class UPDATEDUSERITEMRELATION1708421094520 implements MigrationInterface {
    name = 'UPDATEDUSERITEMRELATION1708421094520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_87551e041c180c6bea8400f9460"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_87551e041c180c6bea8400f9460" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_87551e041c180c6bea8400f9460"`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_87551e041c180c6bea8400f9460" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
