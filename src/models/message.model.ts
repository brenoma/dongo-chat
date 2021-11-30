import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => User, (author: User) => author.messages)
  author: User;

  // @OneToMany(type => Room, roomId => roomId.id)
  // roomId: number;

  @CreateDateColumn()
  created_at: Date;
}
