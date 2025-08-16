import { Migration } from '@mikro-orm/migrations';

export class Migration20250816191019 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "secret" varchar(255) not null, "role" varchar(255) not null default 'USER', constraint "users_pkey" primary key ("id"));`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }

}
