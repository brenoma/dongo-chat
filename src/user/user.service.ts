import { Body, HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  list() {
    return this.userRepo.find();
  }

  async createUser(@Body() createUserDto) {
    console.log(createUserDto.body.name)
    createUserDto.password = hashSync(createUserDto.body.password, 8);

    const user = this.userRepo.create(createUserDto.body);

    return await this.userRepo.save(user).catch((err) => {
      throw new HttpException('Não foi possível cadastrar', HttpStatus.BAD_REQUEST)
    })
  }

  async findUser(email: FindUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { email: email },
    });

    if(!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
