export class LoginUserDto {

  //@IsNotEmpty() -- Class validator
  readonly email: string;

  //@IsNotEmpty() -- Class validator
  readonly password: string;
}