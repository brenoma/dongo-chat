import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  validate(username: string, password: string) {
    return this.authService.validate(username, password)
  }
}

// controler - route
// service - validação
// repository - banco