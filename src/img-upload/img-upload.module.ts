import { Module } from '@nestjs/common';
import { ImgUploadService } from './img-upload.service';
import { ImgUploadController } from './img-upload.controller';
import { ImgUploadProvider } from './img-upload';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ImgUploadService, ImgUploadProvider],
  controllers: [ImgUploadController],
})
export class ImgUploadModule {}
