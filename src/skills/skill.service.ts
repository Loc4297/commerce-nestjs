import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSkillDTO } from './dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllSkills() {
    const allSkills = await this.prismaService.skill.findMany();
    return allSkills;
  }

  public async createSkill(data: CreateSkillDTO) {
    const createSkill = await this.prismaService.skill.create({
      data: {
        name: data.name,
      },
    });
    return createSkill;
  }
}
