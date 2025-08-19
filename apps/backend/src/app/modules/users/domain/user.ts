import { Role } from '@bookings-app/shared-types';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly secret: string,
    public readonly role: Role
  ) {
  }
}
