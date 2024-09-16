import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BASE_URL } from 'src/config';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    console.log('User:', user); // Add this for debugging

    if (!user || !user.email) {
      throw new Error('User or email is missing'); // Defensive error handling
    }

    const confirmationUrl = `${BASE_URL}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ArtGalore! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        confirmationUrl,
      },
    });
  }
}
