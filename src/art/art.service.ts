import { Injectable } from '@nestjs/common';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtService {
  constructor(private prisma: PrismaService) {}

  create(createArtDto: CreateArtDto) {
    return this.prisma.art.create({
      data: createArtDto,
    });
  }

  findAll() {
    return this.prisma.art.findMany();
  }

  findOne(id: number) {
    return this.prisma.art.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateArtDto: UpdateArtDto) {
    return this.prisma.art.update({
      where: {
        id,
      },
      data: updateArtDto,
    });
  }

  remove(id: number) {
    return this.prisma.art.delete({
      where: {
        id,
      },
    });
  }

  findByUser(userId: number) {
    return this.prisma.art.findMany({
      where: {
        userId,
      },
    });
  }

  async getArtDetailsByIds(artIds: number[]) {
    return await this.prisma.art.findMany({
      where: {
        id: {
          in: artIds,
        },
      },
      select: {
        id: true,
        art_name: true,
        price: true,
        User: {
          select: {
            name: true,
          },
        },
        image: true,
      },
    });
  }
}
