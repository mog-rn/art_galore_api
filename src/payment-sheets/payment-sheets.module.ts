import { Module } from '@nestjs/common';
import { PaymentSheetsService } from './payment-sheets.service';
import { PaymentSheetsController } from './payment-sheets.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentSheetsController],
  providers: [PaymentSheetsService, PrismaService],
  imports: [],
})
export class PaymentSheetsModule {}
