import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Room } from './room.model';
import { User } from './user.model';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryColumn({ primary: true })
  id: number;

  @Column({ type: "string", length: 140, nullable: false })
  content: string;

  @OneToMany(type => User, userId => userId.id)
  userId: ObjectID;

  @OneToMany(type => Room, roomId => roomId.id)
  roomId: number;

  @CreateDateColumn()
  created_at: Date;
}
