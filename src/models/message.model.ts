import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './room.model';
import { User } from './user.model';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({})
  content: string;

  @OneToMany(type => User, userId => userId.id)
  userId: number;

  // @OneToMany(type => Room, roomId => roomId.id)
  // roomId: number;

  @CreateDateColumn()
  created_at: Date;
}
