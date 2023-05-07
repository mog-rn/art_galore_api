import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtController],
  providers: [ArtService]
})
export class ArtModule {}
