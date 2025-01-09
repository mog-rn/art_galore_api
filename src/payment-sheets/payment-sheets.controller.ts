import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentSheetsService } from './payment-sheets.service';
import { CreatePaymentSheetDto } from './dto/create-payment-sheet.dto';
import { UpdatePaymentSheetDto } from './dto/update-payment-sheet.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('payment-sheets')
@ApiTags('Payment Sheets')
export class PaymentSheetsController {
  constructor(private readonly paymentSheetsService: PaymentSheetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: CreatePaymentSheetDto })
  async create(@Body() createPaymentSheetDto: CreatePaymentSheetDto) {
    return this.paymentSheetsService.create(createPaymentSheetDto);
  }

  @Get()
  findAll() {
    return this.paymentSheetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentSheetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentSheetDto: UpdatePaymentSheetDto,
  ) {
    return this.paymentSheetsService.update(+id, updatePaymentSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentSheetsService.remove(+id);
  }
}
