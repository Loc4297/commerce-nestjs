import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLevelDTO } from './dto/create-level.dto';

@Injectable()
export class LevelService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllLevels() {
    const allLevels = await this.prismaService.level.findMany();
    return allLevels;
  }

  public async createLevel(data: CreateLevelDTO) {
    const createLevel = await this.prismaService.level.create({
      data: {
        name: data.name,
      },
    });
    return createLevel;
  }
}
