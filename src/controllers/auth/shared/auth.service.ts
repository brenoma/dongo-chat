import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async validate(username: string, password: string) : Promise<any> {
    const user = await this.authRepo.findOne({
      where: {
        email: username,
      },
    });

    console.log(user)

    if(user && compareSync(password, user.password)) {
      const token = await 'IMPLEMENTACAO JWT';
      return {
        email: user.email,
        role: user.role,
        message: `Bem vindo, ${user.name}`,
        token: this.jwtService.sign({username: user.email, sub: user.id,})
      };
    } throw new HttpException('Email e/ou senha incorretos', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    const payLoad = { username: user.username, sub: user.userId }
    return {
      acess_token: this.jwtService.sign(payLoad)
    }
  }

}
