import { MigrationInterface, QueryRunner } from "typeorm";

export class INITMIGRATION1703871146829 implements MigrationInterface {
    name = 'INITMIGRATION1703871146829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_fa170fda66d232af69b7f880c9e" UNIQUE ("name"), CONSTRAINT "PK_33b81de5358589c738907c3559b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "type_id" uuid, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "sender_id" character varying NOT NULL, "room_id" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "last_message_id" uuid, CONSTRAINT "REL_0c484446b401e67b72f451faae" UNIQUE ("last_message_id"), CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms_members_users" ("rooms_id" uuid NOT NULL, "users_id" uuid NOT NULL, CONSTRAINT "PK_195a6d782eccfc42cb4f8cccf25" PRIMARY KEY ("rooms_id", "users_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca3b887e60e31f2972e1fed882" ON "rooms_members_users" ("rooms_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_51334b6a956114ab47da04f54c" ON "rooms_members_users" ("users_id") `);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_a05ad4121bd274e50c9d08ab867" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_0c484446b401e67b72f451faae6" FOREIGN KEY ("last_message_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" ADD CONSTRAINT "FK_ca3b887e60e31f2972e1fed882c" FOREIGN KEY ("rooms_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" ADD CONSTRAINT "FK_51334b6a956114ab47da04f54c1" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_members_users" DROP CONSTRAINT "FK_51334b6a956114ab47da04f54c1"`);
        await queryRunner.query(`ALTER TABLE "rooms_members_users" DROP CONSTRAINT "FK_ca3b887e60e31f2972e1fed882c"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_0c484446b401e67b72f451faae6"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_a05ad4121bd274e50c9d08ab867"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51334b6a956114ab47da04f54c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca3b887e60e31f2972e1fed882"`);
        await queryRunner.query(`DROP TABLE "rooms_members_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "types"`);
    }

}
