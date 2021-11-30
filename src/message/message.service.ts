import { Request, HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/models/message.model';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/createmessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) { }

  async getAllMessages() {
    return await this.messageRepo.find();
  }

  async getMessageById(id: number) {
    const message = await this.messageRepo.findOne(id);
    if (message) {
      return message
    }
    throw new HttpException('Message not found', HttpStatus.NOT_FOUND)
  }

  async createMessage(@Body() data) {
    const newMessage = await this.messageRepo.create(data)
    console.log(data)
    await this.messageRepo.save(newMessage)
    console.log("-------------------")
    console.log(newMessage)
    // const message = this.messageRepo.create(data);

    // return await this.messageRepo.save(message).catch((err) => {
    //   throw new HttpException('Não foi possível salvar mensagem', HttpStatus.BAD_REQUEST)
    // })
  }
}
