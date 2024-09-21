import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryResponse } from './cloudinary-reponse';
import { ImgUploadService } from './img-upload.service';

@Controller('img-upload')
@ApiTags('img-upload')
export class ImgUploadController {
  constructor(private readonly imgUploadService: ImgUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Make sure to intercept file upload
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CloudinaryResponse> {
    return this.imgUploadService.uploadFile(file);
  }
}
