import { Injectable } from '@nestjs/common';
import { CreatePaymentSheetDto } from './dto/create-payment-sheet.dto';
import { UpdatePaymentSheetDto } from './dto/update-payment-sheet.dto';
const stripe = require('stripe')('sk_test_51N41wCKvbhlMKkRFSyG7EBrt63ETGGAXkot5JXjaNfre7Y4Lx5UWnypluoCpqsBVPM0tbOVkLH25Q1hyHq0TKKjg00Sp3GG8IG')

@Injectable()
export class PaymentSheetsService {
  async create(createPaymentSheetDto: CreatePaymentSheetDto) {
    const customer = await stripe.customers.create()
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}
    )
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['card'],
      metadata: {integration_check: 'accept_a_payment'},
    })

    return {
      customer: customer.id,
      ephemeralKey: ephemeralKey.secret,
      paymentIntent: paymentIntent.client_secret,
      publishableKey: 'sk_test_51N41wCKvbhlMKkRFSyG7EBrt63ETGGAXkot5JXjaNfre7Y4Lx5UWnypluoCpqsBVPM0tbOVkLH25Q1hyHq0TKKjg00Sp3GG8IG',
    }
  }

  findAll() {
    return `This action returns all paymentSheets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentSheet`;
  }

  update(id: number, updatePaymentSheetDto: UpdatePaymentSheetDto) {
    return `This action updates a #${id} paymentSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentSheet`;
  }
}
