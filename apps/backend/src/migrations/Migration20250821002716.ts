import { Migration } from '@mikro-orm/migrations';

export class Migration20250821002716 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" add constraint "users_cpf_unique" unique ("cpf");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_cpf_unique";`);
  }

}
