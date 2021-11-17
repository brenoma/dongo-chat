import { Message } from "src/models/message.model"

export class CreateMessageDto extends Message {
  id: number
  content: string
  userId: number
  created_at: Date
}