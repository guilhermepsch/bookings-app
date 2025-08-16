import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../domain/users.service';
import { CreateUserDto, CreateUserSchema } from '@bookings-app/shared-types';
import { ZodPipe } from '@common/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(new ZodPipe(CreateUserSchema)) body : CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      return { message: 'User not found' };
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
