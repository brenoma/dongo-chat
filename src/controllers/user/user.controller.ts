import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './shared/user.service';
import { Response } from 'express';

// CRUD
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  listUsers() {
    return this.userService.list();
  }

  @Get('find')
  findUser(@Body() body) {
    return this.userService.findUser(body);
  }

  @Post('create')
  createUser(@Body() body) {
    return this.userService.createUser(body);
  }
}
