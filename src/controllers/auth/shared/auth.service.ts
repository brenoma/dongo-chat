import { Body, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepo: Repository<User>,
  ) { }

  @Post()
  async login(@Body() body) {
    // this.authRepo.create(body);

    const user = await this.authRepo.findOneOrFail({
      where:
      {
        email: body.email,
        password: body.password
      }
    })

    if (!user) throw 'Email e/ou senha incorretos'

    const token = await 'IMPLEMENTACAO JWT'

    return {
      message: `Bem vindo, ${user.name}`,
      token
    }

  }
}
