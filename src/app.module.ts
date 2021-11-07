import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController } from './controllers/user/user.controller';
import { User } from './models/user.model';
import { UserService } from './controllers/user/shared/user.service';
import { UserModule } from './controllers/user/user.module';

import { AuthModule } from './controllers/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';

import { MessageController } from './controllers/message/message.controller';
import { MessageModule } from './controllers/message/message.module';
import { MessageService } from './controllers/message/shared/message.service';
import { Message } from './models/message.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Message],
    }),
    TypeOrmModule.forFeature([User, Message]),
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController, UserController, AuthController, MessageController],
  providers: [AppService, UserService, MessageService],
})
export class AppModule { }
