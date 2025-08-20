import { Migration } from '@mikro-orm/migrations';

export class Migration20250820224126 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "reservas" drop constraint "reservas_client_id_foreign";`);
    this.addSql(`alter table "reservas" drop constraint "reservas_accommodation_id_foreign";`);

    this.addSql(`alter table "users" add column "created_at" timestamptz;`);
    this.addSql(`alter table "users" add column "updated_at" timestamptz;`);
    this.addSql(`update "users" set created_at = now(), updated_at = now();`);
    this.addSql(`alter table "users" alter column "created_at" set not null;`);
    this.addSql(`alter table "users" alter column "updated_at" set not null;`);

    this.addSql(`alter table "customers" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);
    this.addSql(`alter table "customers" alter column "id" drop default;`);
    this.addSql(`alter table "customers" alter column "id" type uuid using ("id"::text::uuid);`);

    this.addSql(`alter table "accommodations" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);
    this.addSql(`alter table "accommodations" alter column "id" drop default;`);
    this.addSql(`alter table "accommodations" alter column "id" type uuid using ("id"::text::uuid);`);

    this.addSql(`alter table "reservas" drop column "client_id";`);

    this.addSql(`alter table "reservas" add column "customer_id" uuid not null, add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;`);
    this.addSql(`alter table "reservas" alter column "id" drop default;`);
    this.addSql(`alter table "reservas" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "reservas" alter column "accommodation_id" drop default;`);
    this.addSql(`alter table "reservas" alter column "accommodation_id" type uuid using ("accommodation_id"::text::uuid);`);
    this.addSql(`alter table "reservas" add constraint "reservas_customer_id_foreign" foreign key ("customer_id") references "customers" ("id") on update cascade;`);
    this.addSql(`alter table "reservas" add constraint "reservas_accommodation_id_foreign" foreign key ("accommodation_id") references "accommodations" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "customers" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "accommodations" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "reservas" alter column "id" type text using ("id"::text);`);
    this.addSql(`alter table "reservas" alter column "accommodation_id" type text using ("accommodation_id"::text);`);

    this.addSql(`alter table "reservas" drop constraint "reservas_customer_id_foreign";`);
    this.addSql(`alter table "reservas" drop constraint "reservas_accommodation_id_foreign";`);

    this.addSql(`alter table "users" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "customers" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "customers" alter column "id" type varchar(255) using ("id"::varchar(255));`);

    this.addSql(`alter table "accommodations" drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "accommodations" alter column "id" type varchar(255) using ("id"::varchar(255));`);

    this.addSql(`alter table "reservas" drop column "customer_id", drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "reservas" add column "client_id" varchar(255) not null;`);
    this.addSql(`alter table "reservas" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "reservas" alter column "accommodation_id" type varchar(255) using ("accommodation_id"::varchar(255));`);
    this.addSql(`alter table "reservas" add constraint "reservas_client_id_foreign" foreign key ("client_id") references "customers" ("id") on update cascade;`);
    this.addSql(`alter table "reservas" add constraint "reservas_accommodation_id_foreign" foreign key ("accommodation_id") references "accommodations" ("id") on update cascade;`);
  }

}
