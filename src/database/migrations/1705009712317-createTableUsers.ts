import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1705009712317 implements MigrationInterface {
  name = 'CreateTableUsers1705009712317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_registration_number_type_enum" AS ENUM('cpf', 'cnpj')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_roles_enum" AS ENUM('admin', 'user', 'employee')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "registration_number" character varying NOT NULL, "registration_number_type" "public"."users_registration_number_type_enum" NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "password" character varying NOT NULL, "roles" "public"."users_roles_enum" array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."users_registration_number_type_enum"`,
    );
  }
}
