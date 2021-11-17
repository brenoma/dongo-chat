import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';

import { UserController } from './user/user.controller';
import { User } from './models/user.model';
import { UserService } from './user/user.service';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';
import { Message } from './models/message.model';

import { typeOrmConfig } from 'configs/typeorm.config';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig()),
    TypeOrmModule.forFeature([User, Message]),
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController, UserController, AuthController, MessageController],
  providers: [UserService, MessageService, AppGateway],
})
export class AppModule { }