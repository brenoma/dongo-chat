import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './shared/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body)
  }
}

// controler - route
// service - validação
// repository - banco