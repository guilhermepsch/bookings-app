import { Migration } from '@mikro-orm/migrations';

export class Migration20250820212411 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "accommodations" add column "user_id" uuid not null;`);
    this.addSql(`alter table "accommodations" add constraint "accommodations_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "accommodations" drop constraint "accommodations_user_id_foreign";`);

    this.addSql(`alter table "accommodations" drop column "user_id";`);
  }

}
