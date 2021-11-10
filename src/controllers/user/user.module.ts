import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/shared/auth.service';
import { UserService } from './shared/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    AuthService
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [AuthModule]
})
export class UserModule {}
