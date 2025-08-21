import { UserRoles } from '@bookings-app/shared-types';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly secret: string,
    public readonly fullName: string,
    public readonly phone: string,
    public readonly cpf: string,
    public readonly role: UserRoles,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly accommodationsIds: string[] = [],
    public readonly reservationsIds: string[] = []
  ) {}
}
