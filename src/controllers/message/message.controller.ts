import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) { }

  @Get()
  getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Get(':id')
  getMessageById(@Param('id') id: string) {
    return this.messageService.getMessageById(Number(id))
  }

  // @Post()
  // async createMessage(@Body() message: CreateMessageDto) {
  //   return this.messageService.createMessage(message)
  // }

  // @Put(':id')
  // async editMessage(@Param('id') id: string, @Body() message: UpdateMessageDto) {
  //   return this.messageService.editMessage(Number(id), message)
  // }

  // @Delete(':id')
  // async deleteMessage(@Param('id') id: string) {
  //   this.messageService.deleteMessage(Number(id))
  // }
}