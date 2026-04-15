import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      console.log('--- Firebase Admin Initialization ---');
      
      const possiblePaths = [
        path.join(process.cwd(), 'firebase-service-account.json'),
        path.join(process.cwd(), 'backend', 'firebase-service-account.json'),
        path.join(__dirname, '..', '..', 'firebase-service-account.json'),
        path.join(__dirname, '..', 'firebase-service-account.json'),
      ];

      let initialized = false;

      for (const serviceAccountPath of possiblePaths) {
        if (fs.existsSync(serviceAccountPath)) {
          try {
            let raw = fs.readFileSync(serviceAccountPath, 'utf8');
            
            // ROBUSTNESS FIX: Remove accidental bad backslashes before 'u' 
            // often caused by tool/shell encoding issues
            if (raw.includes('\\u')) {
              console.log('Found potential bad unicode escapes, cleaning...');
              // If it's not a valid \uXXXX, just make it 'u'
              raw = raw.replace(/\\u(?![0-9a-fA-F]{4})/g, 'u');
            }

            const serviceAccount = JSON.parse(raw);
            
            admin.initializeApp({
              credential: admin.credential.cert(serviceAccount),
            });
            console.log(`✅ Firebase Admin initialized from: ${serviceAccountPath}`);
            initialized = true;
            break;
          } catch (e) {
            console.error(`❌ Error parsing ${serviceAccountPath}:`, e.message);
          }
        }
      }

      if (!initialized) {
        const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountEnv) {
          try {
            const cert = JSON.parse(serviceAccountEnv);
            admin.initializeApp({
              credential: admin.credential.cert(cert),
            });
            console.log('✅ Firebase Admin initialized from environment variable.');
            initialized = true;
          } catch (e) {
            console.error('❌ Error parsing FIREBASE_SERVICE_ACCOUNT env:', e.message);
          }
        }
      }

      if (!initialized) {
        console.warn('⚠️ No Firebase service account found. Falling back to default credentials.');
        admin.initializeApp();
      }
      console.log('--- End Firebase Initialization ---');
    }
  }
}
