import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway')

  afterInit(server: Server) {
    this.logger.log('GATEWAY INITIALIZED')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected: ${client.id}`)
    const users = [{ userID: 1, username: client.handshake.auth.username }];
    for (let i = 0; i < 3; i++) {
      users.push({
        userID: 1,
        username: 'teste'
      })
    }
    client.emit('users', users)

    client.broadcast.emit('user connected', {
      userID: client.id,
      username: client.handshake.auth.username
    })
  }

  handleDisconnect(client: Socket, ...agrs: any[]) {
    this.logger.log(`Client Disconnected ${client.id}`)
    client.broadcast.emit('user disconnected', client.id)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: text }
  }

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() body: any) {
    console.log(body)
  }
}
