import { Module } from '@nestjs/common';
import { ImgUploadService } from './img-upload.service';
import { ImgUploadController } from './img-upload.controller';
import { ImgUploadProvider } from './img-upload';

@Module({
  providers: [ImgUploadService, ImgUploadProvider],
  controllers: [ImgUploadController]
})
export class ImgUploadModule {}
