import { Message } from "src/models/message.model"
import { User } from "src/models/user.model"

export class CreateMessageDto extends Message {
  content: string
  author: User
}