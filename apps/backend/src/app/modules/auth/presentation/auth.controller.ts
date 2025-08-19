import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ZodPipe } from '@common/pipes/zod-validation.pipe';
import {
  SignInDto,
  SignInSchema,
} from '@bookings-app/shared-types';
import { AuthService } from '@modules/auth/domain/auth.service';
import { Public } from '@common/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async create(@Body(new ZodPipe(SignInSchema)) body: SignInDto) {
    return this.authService.signIn(body);
  }
}
