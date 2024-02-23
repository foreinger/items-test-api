import { MigrationInterface, QueryRunner } from "typeorm";

export class UPDATEDUSERROOMRELATION1708421432327 implements MigrationInterface {
    name = 'UPDATEDUSERROOMRELATION1708421432327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_members_users" DROP CONSTRAINT "FK_51334b6a956114ab47da04f54c1"`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" ADD CONSTRAINT "FK_51334b6a956114ab47da04f54c1" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_members_users" DROP CONSTRAINT "FK_51334b6a956114ab47da04f54c1"`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" ADD CONSTRAINT "FK_51334b6a956114ab47da04f54c1" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
