import { Body, Controller, Get, Post } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDTO } from './dto/create-skill.dto';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getAllSkills() {
    return this.skillService.getAllSkills();
  }

  @Post()
  createSkill(@Body() data: CreateSkillDTO) {
    return this.skillService.createSkill(data);
  }
}
