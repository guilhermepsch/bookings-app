import { Inject, Injectable } from '@nestjs/common';
import { IHashService, IHashServiceSymbol } from '@common/resources/hash/domain/hash.service.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/domain/users.service';
import { SignInDto } from '@bookings-app/shared-types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(IHashServiceSymbol) private readonly hashService: IHashService
  ) {}

  async signIn(dto: SignInDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await this.hashService.compare(
      dto.password,
      user.secret
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
      payload: this.jwtService.decode(token),
    }
  }
}
