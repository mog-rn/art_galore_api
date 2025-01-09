/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePaymentSheetDto } from './dto/create-payment-sheet.dto';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class PaymentSheetsService {
  async create(createPaymentSheetDto: CreatePaymentSheetDto) {
    try {
      const customer = await stripe.customers.create();

      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2022-11-15' },
      );

      const paymentIntent = await stripe.paymentIntents.create({
        amount: createPaymentSheetDto.amount,
        currency: createPaymentSheetDto.currency || 'usd',
        customer: customer.id,
        payment_method_types: ['card'],
      });

      return {
        customer: customer.id,
        ephemeralKey: ephemeralKey.secret,
        paymentIntent: paymentIntent.client_secret,
      };
    } catch (error) {
      console.error('Error creating payment sheet:', error);
      throw new InternalServerErrorException('Failed to create payment sheet');
    }
  }

  findAll() {
    return `This action returns all payment sheets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment sheet`;
  }

  update(id: number, updatePaymentSheetDto: any) {
    return `This action updates a #${id} payment sheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment sheet`;
  }
}
