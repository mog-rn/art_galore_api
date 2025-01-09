/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentSheetDto } from './dto/create-payment-sheet.dto';
import { UpdatePaymentSheetDto } from './dto/update-payment-sheet.dto';
import { MailService } from 'src/mail/mail.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class PaymentSheetsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createPaymentSheetDto: CreatePaymentSheetDto, userId: number) {
    const MINIMUM_AMOUNT_USD_CENTS = 50;
    const exchangeRate = 130;
    const amountInUsdCents = Math.ceil(
      (createPaymentSheetDto.amount / exchangeRate) * 100,
    );

    if (amountInUsdCents < MINIMUM_AMOUNT_USD_CENTS) {
      throw new BadRequestException(
        `The amount must be at least KES ${Math.ceil(
          (MINIMUM_AMOUNT_USD_CENTS * exchangeRate) / 100,
        )}.`,
      );
    }

    try {
      const customer = await stripe.customers.create();

      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2022-11-15' },
      );

      const paymentIntent = await stripe.paymentIntents.create({
        amount: createPaymentSheetDto.amount,
        currency: 'kes',
        customer: customer.id,
        payment_method_types: ['card'],
      });

      const promises = createPaymentSheetDto.artIds.map(async (artId) => {
        const art = await this.prisma.art.findUnique({
          where: { id: artId },
        });

        if (!art || art.quantity < 1) {
          throw new BadRequestException(
            `Art with ID ${artId} is out of stock.`,
          );
        }

        await this.prisma.art.update({
          where: { id: artId },
          data: {
            quantity: art.quantity - 1,
            sold: art.sold + 1,
          },
        });

        return this.prisma.payment.create({
          data: {
            transaction_id: paymentIntent.id,
            userId: userId,
            art_id: artId,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      });

      const savedPayments = await Promise.all(promises);

      return {
        customer: customer.id,
        ephemeralKey: ephemeralKey.secret,
        paymentIntent: paymentIntent.client_secret,
        payments: savedPayments,
      };
    } catch (error) {
      console.error('Error creating payment sheet:', error);
      throw new InternalServerErrorException('Failed to create payment sheet');
    }
  }

  async findAll() {
    return this.prisma.payment.findMany();
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { transaction_id: id },
    });
    if (!payment)
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    return payment;
  }

  async update(id: string, dto: UpdatePaymentSheetDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { transaction_id: id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    }

    const data: any = {};

    if (dto.amount) {
      data.amount = dto.amount;
    }

    if (dto.artIds && dto.artIds.length > 0) {
      await Promise.all(
        dto.artIds.map(async (artId) => {
          const art = await this.prisma.art.findUnique({
            where: { id: artId },
          });

          if (!art) {
            throw new NotFoundException(`Art with ID ${artId} not found.`);
          }

          await this.prisma.art.update({
            where: { id: artId },
            data: {
              quantity: { decrement: 1 },
              sold: { increment: 1 },
            },
          });
        }),
      );
    }

    return this.prisma.payment.update({
      where: { transaction_id: id },
      data,
    });
  }

  async remove(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { transaction_id: id },
    });
    if (!payment)
      throw new NotFoundException(`Payment with ID ${id} not found.`);
    return this.prisma.payment.delete({ where: { transaction_id: id } });
  }

  async handlePaymentSuccess(userId: number, paymentDetails: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const artDetails = await this.prisma.art.findMany({
      where: { id: { in: paymentDetails.artIds } },
      select: { art_name: true, price: true },
    });

    const receiptDetails = {
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      artDetails,
    };

    await this.mailService.sendPaymentReceipt(user, receiptDetails);

    return { message: 'Payment and receipt email sent successfully' };
  }
}
