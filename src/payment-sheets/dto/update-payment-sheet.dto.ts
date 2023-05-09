import { PartialType } from '@nestjs/swagger';
import { CreatePaymentSheetDto } from './create-payment-sheet.dto';

export class UpdatePaymentSheetDto extends PartialType(CreatePaymentSheetDto) {}
