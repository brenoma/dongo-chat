import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get()
  listUsers() {
    return this.userRepo.find();
  }

  @Get(':id')
  showUser(@Param('id') id: string) {
    return this.userRepo.findOne(id)
  }

  @Post()
  createUser(@Body() body) {
    const user = this.userRepo.create(body);
    return this.userRepo.save(user);
  }
}
