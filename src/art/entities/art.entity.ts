import { Art } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ArtEntity implements Art {
  @ApiProperty()
  id: number;

  @ApiProperty()
  art_name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  size: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  sold: number;

  @ApiProperty()
  userId: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
