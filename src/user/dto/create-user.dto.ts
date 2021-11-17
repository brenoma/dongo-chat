
export class CreateUserDto {

  //@IsNotEmpty() -- Class Validator
  email: string

  //@IsNotEmpty() -- Class Validator
  name: string

  //@IsNotEmpty() -- Class validator
  password: string

  role: string
}