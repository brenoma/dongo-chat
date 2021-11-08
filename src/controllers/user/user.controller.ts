import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './shared/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/shared/auth.service';

// CRUD
@Controller('users')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

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

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.validate(req.body.username, req.body.password)
  }
}
