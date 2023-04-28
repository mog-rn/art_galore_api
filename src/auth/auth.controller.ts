/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    const token = Math.floor(1000 + Math.random() * 1000000).toString();

    await this.mailService.sendUserConfirmation(result?.data, token);

    if (!result.success) {
      throw new HttpException(result.message!, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}
