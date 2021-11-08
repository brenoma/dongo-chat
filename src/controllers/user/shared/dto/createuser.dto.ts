import { User } from "src/models/user.model"

export class CreateUserDto extends User{
  id: number
  email: string
  name: string
  password: string
  role: string
  created_at: Date
}