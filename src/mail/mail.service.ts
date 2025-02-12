import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BASE_URL } from 'src/config';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    console.log('User:', user);

    if (!user || !user.email) {
      throw new Error('User or email is missing');
    }

    const confirmationUrl = `${BASE_URL}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Masterpiece Market! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        confirmationUrl,
      },
    });
  }

  async sendPaymentReceipt(user: UserEntity, paymentDetails: any) {
    if (!user || !user.email) {
      throw new Error('User or email is missing');
    }

    const { amount, currency, artDetails } = paymentDetails;

    if (!artDetails || !Array.isArray(artDetails)) {
      throw new Error('Invalid artDetails format');
    }

    // Validate each art detail
    artDetails.forEach((art, index) => {
      if (!art.art_name || art.price == null) {
        throw new Error(
          `Art detail at index ${index} is missing required fields`,
        );
      }
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Your Masterpiece Market Payment Receipt',
      template: './receipt',
      context: {
        name: user.name,
        amount: (amount / 100).toFixed(2),
        currency: currency.toUpperCase(),
        artDetails,
      },
    });
  }
}
