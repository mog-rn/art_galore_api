/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import * as fs from 'node:fs';
import * as handlebars from 'handlebars';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailService,
    private prisma: PrismaService,
  ) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message!, HttpStatus.BAD_REQUEST);
    }

    // TODO: Move this to service
    // Send the email confirmation using the token from the `Token` table
    const token = await this.prisma.token.findFirst({
      where: { userId: result.data.id },
      orderBy: { createdAt: 'desc' }, // Get the latest token if multiple exist
    });

    await this.mailService.sendUserConfirmation(result?.data, token?.token);

    return result;
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Get('confirm')
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    const result = await this.authService.confirmEmail(token);

    // Load the Handlebars template from the auth/templates folder
    const templatePath = join(__dirname, 'templates', 'confirmation.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    // Render the template with the success status
    const html = template({ success: result });

    // Send the rendered HTML as the response
    res.send(html);
  }
}
