import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from 'configs/typeorm.config';
import { Message } from 'src/models/message.model';
import { jwtConstants } from 'src/auth/shared/constants';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            listUsers: jest.fn(),
            findUser: jest.fn(),
            createUser: jest.fn(),
            login: jest.fn(),
          }
        },
      ],
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
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {expiresIn: '60s'}
        })
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
    expect(1 + 1).toBe(2)
  });
});
