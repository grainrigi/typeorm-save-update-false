import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1690947349587 implements MigrationInterface {
    name = 'Init1690947349587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "example_entity" ("id" character varying NOT NULL, "notUpdatable" character varying NOT NULL, "updatable" character varying NOT NULL, CONSTRAINT "PK_fccd73330168066a434dbac114f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "example_entity"`);
    }

}
