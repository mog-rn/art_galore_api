import { Injectable } from '@nestjs/common';
import { CreatePaymentSheetDto } from './dto/create-payment-sheet.dto';
import { UpdatePaymentSheetDto } from './dto/update-payment-sheet.dto';

@Injectable()
export class PaymentSheetsService {
  create(createPaymentSheetDto: CreatePaymentSheetDto) {
    return 'This action adds a new paymentSheet';
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
