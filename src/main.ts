import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

// class WebSocketAdapter extends IoAdapter {
//   public createIOServer(
//     port: number,
//     options?: ServerOptions & {
//       namespace?: string;
//       server?: any;
//     },
//   ) {
//     return super.createIOServer(3333, { ...options, cors: true });
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useWebSocketAdapter(new WebSocketAdapter(app))
  // app.useStaticAssets(join(__dirname, '..', 'static'))
  await app.listen(process.env.PORT);
  console.log(`application running on port - ${await app.getUrl()}`)
}
bootstrap();
