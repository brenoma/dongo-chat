import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController } from './controllers/user/user.controller';
import { User } from './models/user.model';
import { UserService } from './controllers/user/user.service';

import { AuthModule } from './controllers/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';

import { MessageController } from './controllers/message/message.controller';
import { MessageModule } from './controllers/message/message.module';
import { MessageService } from './controllers/message/message.service';
import { Message } from './models/message.model';

import { WebsocketService } from './websocket/websocket.service';
import { typeOrmConfig } from 'configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig()),
    TypeOrmModule.forFeature([User, Message]),
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController, UserController, AuthController, MessageController],
  providers: [AppService, UserService, MessageService, WebsocketService],
})
export class AppModule { }