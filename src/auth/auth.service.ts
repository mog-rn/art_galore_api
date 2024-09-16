import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

export interface RegistrationStatus {
  success: boolean;
  message?: string;
  data?: UserEntity;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'User created successfully',
    };

    try {
      // Create the user
      const user = await this.userService.create(userDto);

      // Generate a confirmation token and store it in the Token table
      const token = crypto.randomBytes(32).toString('hex'); // Generate a random token
      await this.prisma.token.create({
        data: {
          token,
          userId: user.id,
        },
      });

      status.data = user;
    } catch (error) {
      status = {
        success: false,
        message: error.message,
      };
    }

    return status;
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found with email: ${email}`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid Password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async confirmEmail(token: string): Promise<boolean> {
    // Retrieve the user by the confirmation token
    const storedToken = await this.prisma.token.findUnique({
      where: { token },
      include: { User: true },
    });

    if (!storedToken) {
      return false; // Invalid token or token not found
    }

    // Mark the user's email as confirmed
    await this.userService.update(storedToken.userId, { emailVerified: true });

    // Optionally, delete the token after confirmation
    await this.prisma.token.delete({
      where: { id: storedToken.id },
    });

    return true;
  }
}
