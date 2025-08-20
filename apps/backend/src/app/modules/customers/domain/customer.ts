export class Customer {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly cpf: string,
    public readonly reservationIds: string[] = [],
    public readonly userId: string,
  ) {}
}
