import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArtModule } from './art/art.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ImgUploadModule } from './img-upload/img-upload.module';

@Module({
  imports: [UsersModule, AuthModule, ArtModule, MailModule, PrismaModule, AdminModule, PaymentsModule, NotificationsModule, ImgUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
