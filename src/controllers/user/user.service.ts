import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt'
import { CreateUserDto } from './shared/dto/createuser.dto';
import { FindUserDto } from './shared/dto/finduser.dto';

@Injectable()
export class UserService { 
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  list() {
    return this.userRepo.find();
  }

  async createUser(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = hashSync(createUserDto.password, 8)

    const user = await this.userRepo.create(createUserDto)

    return await this.userRepo.save(user)
    .then((result) => {
      return {
        status: true,
        mensagem: "Usuário Cadastrado com sucesso"
      }
    })
  }

  async findUser(@Body() findUserDto: FindUserDto) {
    const hasUser = await this.userRepo.findOne( {
       where: { email: findUserDto.email } 
      })

    return hasUser ? hasUser : 'User not found'
  }
}
