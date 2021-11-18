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
  ) { }
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authRepo.findOne({
      where: {
        email: username,
      },
    })

    if (!user) throw new HttpException('Email e/ou senha incorretos', HttpStatus.UNAUTHORIZED)

    if (user && compareSync(password, user.password)) {
      return {
        id: user.id,
        user: user.name,
        email: user.email,
        role: user.role,
        token: this.jwtService.sign({ username: user.email, sub: user.id, })
      };
    } throw new HttpException('Email e/ou senha incorretos', HttpStatus.UNAUTHORIZED);
  }

  // async login(user: User) {
  //   const payLoad = { username: user.name, sub: user.id }
  //   return {
  //     acess_token: this.jwtService.sign(payLoad)
  //   }
  // }

}
