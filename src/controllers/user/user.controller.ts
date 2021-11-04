import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

// CRUD
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  @Post()
  createUser(@Body() body) {
    const user = this.userRepo.create(body);
    return this.userRepo.save(user);
  }
}
