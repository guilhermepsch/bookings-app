import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignInResponse } from '@bookings-app/shared-types';
import { UsersService } from '../../users/domain/users.service';
import { IHashService, IHashServiceSymbol } from '../../../common/resources/hash/domain/hash.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(IHashServiceSymbol) private readonly hashService: IHashService
  ) {}

  async signIn(dto: SignInDto): Promise<SignInResponse> {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('User or password invalid');
    }
    const isPasswordValid = await this.hashService.compare(
      dto.password,
      user.secret
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is invalid');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
      payload: this.jwtService.decode(token),
    }
  }
}
