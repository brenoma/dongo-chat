import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3000)
export class WebsocketService implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  private users = {};

  afterInit(server: any) {
    console.log(this.server)
    console.log('\n\nWEBSOCKET SERVER INITIALIZED!!!\n\n')
  }

  handleConnection(client: Socket, ...agrs: any[]) {
    const { name } = client.handshake.query;
    this.users[client.id] = { name };
    console.log(this.users);
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { message: string },
  ): void {
    const { name, roomId } = this.users[client.id];
    client.broadcast.to(roomId).emit('receive-message', { ...body, name });
    console.log(body);
  }

  @SubscribeMessage('join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: {name: string, roomId: string}
  ) : void {
    const {name, roomId} = body
    this.users[client.id] = {name, roomId}
    client.join(roomId)
    console.log('join', client.id, body)
  }
}
