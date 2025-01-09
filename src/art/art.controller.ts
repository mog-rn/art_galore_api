import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('art')
@ApiTags('Art') // Add this
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateArtDto })
  async create(@Body() createArtDto: CreateArtDto) {
    return await this.artService.create(createArtDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateArtDto, isArray: true })
  findAll() {
    return this.artService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateArtDto })
  findOne(@Param('id') id: string) {
    return this.artService.findOne(+id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateArtDto, isArray: true })
  findByUser(@Param('userId') userId: string) {
    return this.artService.findByUser(+userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateArtDto })
  update(@Param('id') id: string, @Body() updateArtDto: UpdateArtDto) {
    return this.artService.update(+id, updateArtDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateArtDto })
  remove(@Param('id') id: string) {
    return this.artService.remove(+id);
  }

  @Post('details')
  async getArtDetails(@Body('artIds') artIds: number[]) {
    if (!artIds || artIds.length === 0) {
      throw new BadRequestException('artIds is required');
    }
    return await this.artService.getArtDetailsByIds(artIds);
  }
}
