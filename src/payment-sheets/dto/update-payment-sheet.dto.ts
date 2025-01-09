import { IsOptional, IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class UpdatePaymentSheetDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  artIds?: number[];
}
