import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message } from 'src/models/message.model';
import { User } from 'src/models/user.model';


export const typeOrmConfig = () => ({
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [User, Message],
}) as TypeOrmModuleOptions