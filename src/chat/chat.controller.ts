import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @UseGuards(FirebaseAuthGuard)
  async sendMessage(@Body('message') message: string, @Req() req: any) {
    const userId = req.user.uid;
    return this.chatService.processMessage(userId, message);
  }
}
