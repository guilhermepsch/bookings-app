import { Migration } from '@mikro-orm/migrations';

export class Migration20250821002323 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "reservas" drop constraint "reservas_customer_id_foreign";`);

    this.addSql(`drop table if exists "customers" cascade;`);

    this.addSql(`alter table "users" add column "full_name" varchar(255) not null, add column "phone" varchar(255) not null, add column "cpf" varchar(255) not null;`);

    this.addSql(`alter table "reservas" rename column "customer_id" to "user_id";`);
    this.addSql(`alter table "reservas" add constraint "reservas_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "customers" ("id" uuid not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "cpf" varchar(255) not null, "user_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "customers_pkey" primary key ("id"));`);
    this.addSql(`alter table "customers" add constraint "customers_user_id_unique" unique ("user_id");`);

    this.addSql(`alter table "customers" add constraint "customers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "reservas" drop constraint "reservas_user_id_foreign";`);

    this.addSql(`alter table "users" drop column "full_name", drop column "phone", drop column "cpf";`);

    this.addSql(`alter table "reservas" rename column "user_id" to "customer_id";`);
    this.addSql(`alter table "reservas" add constraint "reservas_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;`);
  }

}
