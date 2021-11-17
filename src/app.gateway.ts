import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketMessageDto } from './shared/enum/dto/socket-message.dto';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway')
  @WebSocketServer() wsServer: Server;

  afterInit(server: Server) {
    this.logger.log('GATEWAY INITIALIZED')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected: ${client.id}`)
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
  handleMessage(client: Socket, payLoad: SocketMessageDto) {
    payLoad = new SocketMessageDto(payLoad)
    this.logger.log(payLoad.user)
    // client.broadcast.emit('msgToServer', payLoad)
    this.wsServer.emit('msgToServer', payLoad)
  }

  // @SubscribeMessage('msgToClient')
  // sendMessage(@MessageBody() body: any) {
  //   console.log(body)
  // }
}
