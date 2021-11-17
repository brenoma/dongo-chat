export class SocketMessageDto {
  ide: number
  content: string
  user: string

  constructor(message: SocketMessageDto) {
    Object.assign(this,message)    
  }
}