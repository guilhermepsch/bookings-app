import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../domain/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() dto: { name: string; email: string; secret: string }) {
    const user = await this.userService.registerUser(dto.name, dto.email, dto.secret);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
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
