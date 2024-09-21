import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgUploadService } from './img-upload.service';

@Controller('img-upload')
export class ImgUploadController {
  private readonly logger = new Logger(ImgUploadController.name); // Initialize Logger

  constructor(private readonly imgUploadService: ImgUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // This expects the file in the form field with name 'file'
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      this.logger.error('No file provided for upload'); // Log error if file is missing
      throw new BadRequestException('File upload failed');
    }

    try {
      this.logger.log('File received for upload:', file.originalname); // Log the file name received
      const result = await this.imgUploadService.uploadFile(file);
      this.logger.log('File uploaded successfully:', result); // Log successful upload response
      return result;
    } catch (error) {
      this.logger.error('File upload failed:', error); // Log any error that occurs during upload
      throw new BadRequestException('File upload failed');
    }
  }
}
