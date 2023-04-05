import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
  @Get()
  findAll() {
    return this.usersService.find();
  }
  @Get(':email')
  findEmail(@Param('email') email: string) {
    return this.usersService.findEmail(email);
  }
}
