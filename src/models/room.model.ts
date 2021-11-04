import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';
import { Message } from './message.model';
import { User } from './user.model';

@Entity({ name: 'rooms' })
export class Room {
  @ObjectIdColumn({ primary: true })
  id: ObjectID;

  @Column({ type: "string", length: 25, nullable: false })
  name: string;

  @Column({ type: "string", length: 150 })
  description: string;

  @OneToMany(type => User, user => user.id)
  createdBy: User;

  @ManyToOne(type => Message, messageId => messageId.id)
  message: Message[];

  @CreateDateColumn()
  created_at: Date;
}
