export class SocketMessageDto {
  id: number
  content: string
  user: string

  constructor(message: SocketMessageDto) {
    Object.assign(this, message)
  }
}