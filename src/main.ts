import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { AppModule } from './app.module';

class WebSocketAdapter extends IoAdapter {
  public createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    return super.createIOServer(3333, { ...options, cors: true });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new WebSocketAdapter(app));
  await app.listen(process.env.PORT);
}
bootstrap();
