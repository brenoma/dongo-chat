import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { FindUserDto } from './dto/find-user.dto';

// CRUD
@Controller('users')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Get()
  listUsers() {
    return this.userService.list();
  }

  @Post('find')
  findUser(@Request() req) {
    return this.userService.findUser(req.body.email);
  }

  @Post('create')
  createUser(@Request() body) {
    return this.userService.createUser(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.validate(req.body.username, req.body.password)
  }
}
