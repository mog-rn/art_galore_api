import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity> | null) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  emailVerified: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

type Role = 'ADMIN' | 'USER' | 'ARTIST' | 'COLLECTOR';
//   | 'SUPERADMIN'
//   | 'SUPERUSER'
//   | ''
//   | '';
