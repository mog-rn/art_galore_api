import { IsString, IsNotEmpty } from 'class-validator';

export class GetOrderHistoryDto {
  @IsString()
  @IsNotEmpty()
  userId: number;
}
