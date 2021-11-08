import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/models/message.model';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  getAllMessages() {
    return this.messageRepo.find();
  }

  getMessageById(id: number) {
    const message = this.messageRepo.findOne({
      where: {
        id: id,
      },
    });
    if(message) {
      return message
    }
    throw new HttpException('Message not found', HttpStatus.NOT_FOUND)
  }

}
