import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { genSalt, hashSync } from 'bcrypt'

@Injectable()
export class UserService { 
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  list() {
    return this.userRepo.find();
  }

  async createUser(@Body() body) {
    body.password = hashSync(body.password, 8)

    const user = await this.userRepo.create(body)

    return await this.userRepo.save(user)
    .then((result) => {
      return {
        status: true,
        mensagem: "Usuário Cadastrado com sucesso"
      }
    })
  }

  async findUser(@Body() body) {
    const hasUser = await this.userRepo.findOne( {
       where: { email: body.email } 
      })

    return hasUser ? hasUser : 'User not found'
  }
}
