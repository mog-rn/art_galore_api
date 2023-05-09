import { Module } from '@nestjs/common';
import { PaymentSheetsService } from './payment-sheets.service';
import { PaymentSheetsController } from './payment-sheets.controller';

@Module({
  controllers: [PaymentSheetsController],
  providers: [PaymentSheetsService]
})
export class PaymentSheetsModule {}
