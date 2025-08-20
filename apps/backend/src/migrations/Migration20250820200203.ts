import { Migration } from '@mikro-orm/migrations';

export class Migration20250820200203 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "accommodations" ("id" varchar(255) not null, "type" varchar(255) not null, "description" varchar(255) not null, "capacity" int not null, "street_type" varchar(255) not null, "street" varchar(255) not null, "number" varchar(255) not null, "district" varchar(255) not null, "city" varchar(255) not null, "state" varchar(255) not null, "complement" varchar(255) not null, "zip_code" varchar(255) not null, "latitude" int not null, "longitude" int not null, "price_per_night" int not null, "status" varchar(255) not null, constraint "accommodations_pkey" primary key ("id"));`);

    this.addSql(`create table "customers" ("id" varchar(255) not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "cpf" varchar(255) not null, "user_id" uuid not null, constraint "customers_pkey" primary key ("id"));`);
    this.addSql(`alter table "customers" add constraint "customers_user_id_unique" unique ("user_id");`);

    this.addSql(`create table "reservas" ("id" varchar(255) not null, "client_id" varchar(255) not null, "accommodation_id" varchar(255) not null, "check_in" timestamptz not null, "check_out" timestamptz not null, "total_price" int not null, "status" varchar(255) not null, constraint "reservas_pkey" primary key ("id"));`);

    this.addSql(`alter table "customers" add constraint "customers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "reservas" add constraint "reservas_client_id_foreign" foreign key ("client_id") references "customers" ("id") on update cascade;`);
    this.addSql(`alter table "reservas" add constraint "reservas_accommodation_id_foreign" foreign key ("accommodation_id") references "accommodations" ("id") on update cascade;`);

    this.addSql(`alter table "users" drop column "name";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "reservas" drop constraint "reservas_accommodation_id_foreign";`);

    this.addSql(`alter table "reservas" drop constraint "reservas_client_id_foreign";`);

    this.addSql(`drop table if exists "accommodations" cascade;`);

    this.addSql(`drop table if exists "customers" cascade;`);

    this.addSql(`drop table if exists "reservas" cascade;`);

    this.addSql(`alter table "users" add column "name" varchar(255) not null;`);
  }

}
