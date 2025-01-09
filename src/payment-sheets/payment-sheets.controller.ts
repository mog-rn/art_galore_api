import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { PaymentSheetsService } from './payment-sheets.service';
import { CreatePaymentSheetDto } from './dto/create-payment-sheet.dto';
import { UpdatePaymentSheetDto } from './dto/update-payment-sheet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('payment-sheets')
export class PaymentSheetsController {
  constructor(private readonly paymentSheetsService: PaymentSheetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPaymentSheetDto: CreatePaymentSheetDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.paymentSheetsService.create(createPaymentSheetDto, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePaymentSheetDto) {
    return this.paymentSheetsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paymentSheetsService.remove(id);
  }
}
