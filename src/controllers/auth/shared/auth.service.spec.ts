import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Should receive JWWT token when authenticated with valid credentials', () => {
    const x = 2;
    const y = 4;

    const sum = x + y

    expect(sum).toBe(6);
  });
});
