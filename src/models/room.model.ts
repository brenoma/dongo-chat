import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.model';
import { User } from './user.model';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn({  })
  id: number;

  @Column({ })
  name: string;

  @Column({ })
  description: string;

  @OneToMany(type => User, user => user.id)
  createdBy: User;

  @ManyToOne(type => Message, messageId => messageId.id)
  message: Message[];

  @CreateDateColumn()
  created_at: Date;
}
