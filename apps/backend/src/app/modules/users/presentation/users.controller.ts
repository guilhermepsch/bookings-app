import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { Public } from 'src/app/common/decorators/is-public.decorator';
import { ZodPipe } from 'src/app/common/pipes/zod-validation.pipe';
import { CreateUserDto, CreateUserSchema, FindUserDto, FindUserSchema } from '@bookings-app/shared-types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body(new ZodPipe(CreateUserSchema)) body : CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get(':id')
  async findById(@Param(new ZodPipe(FindUserSchema)) params: FindUserDto) {
    const user = await this.usersService.getUserById(params.id);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
