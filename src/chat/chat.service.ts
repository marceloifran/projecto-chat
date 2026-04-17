import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as admin from 'firebase-admin';

@Injectable()
export class ChatService {
  private openai: OpenAI;
  private readonly logger = new Logger(ChatService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey && apiKey.startsWith('sk-')) {
      const isOpenRouter = apiKey.startsWith('sk-or-');
      this.openai = new OpenAI({
        apiKey,
        baseURL: isOpenRouter ? 'https://openrouter.ai/api/v1' : undefined,
      });
      this.logger.log(`✅ OpenAI client initialized${isOpenRouter ? ' (OpenRouter mode)' : ''}.`);
    } else {
      this.logger.warn('⚠️ OPENAI_API_KEY is missing or invalid. AI features will be limited.');
    }
  }

  async processMessage(userId: string, message: string) {
    this.logger.log(`Processing message for user ${userId}: "${message}"`);
    
    let responseText = '';
    let isMock = false;

    if (!this.openai) {
      this.logger.warn('OpenAI not initialized. Using fallback response.');
      responseText = `[MOCK RESPONSE] Hello! I'm in mock mode because no OpenAI key was provided. You said: "${message}"`;
      isMock = true;
    } else {
      try {
        const isOpenRouter = this.configService.get<string>('OPENAI_API_KEY')?.startsWith('sk-or-');
        const model = isOpenRouter ? 'openai/gpt-4o-mini' : 'gpt-4o-mini';
        
        this.logger.log(`Requesting response from ${model}...`);
        const completion = await this.openai.chat.completions.create({
          model: model,
          messages: [{ role: 'user', content: message }],
        });

        responseText = completion.choices[0].message.content || 'I could not generate a response.';
        this.logger.log('✅ AI responded successfully.');
      } catch (error) {
        this.logger.error(`❌ OpenAI Error: ${error.message}`);
        
        if (error.message.includes('quota')) {
          this.logger.warn('Quota exceeded. Falling back to Mock response to keep the app functional.');
          responseText = `[MOCK MODE - Quota Exceeded] I received your message: "${message}". I can't reach the real AI right now because the API quota is empty, but the backend is working perfectly!`;
          isMock = true;
        } else {
          return {
            status: 'error',
            message: 'AI Error',
            error: error.message,
          };
        }
      }
    }

    try {
      this.logger.log('Saving response to Firestore...');
      const db = admin.firestore();
      await db.collection('messages').add({
        text: responseText,
        userId: userId,
        role: 'bot',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isMock: isMock,
      });
      this.logger.log('✅ Bot message saved to Firestore.');

      return {
        status: 'success',
        message: isMock ? 'Mock response generated' : 'AI response generated',
        data: { botResponse: responseText },
      };
    } catch (dbError) {
      this.logger.error(`❌ Firestore Error: ${dbError.message}`);
      return {
        status: 'error',
        message: 'Could not save message to database',
        error: dbError.message,
      };
    }
  }
}
