import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateData: any) {
    return this.usersService.updateUser(id, updateData);
  }
  @Get()
  getUsers(@Query('page') page = 1, @Query('limit') limit = 10, @Query('search') search = '') {
    return this.usersService.getUsers(page, limit, search);
  }
  @Get('count')
  getUserCount() {
    return this.usersService.getUserCount();
  }
}


