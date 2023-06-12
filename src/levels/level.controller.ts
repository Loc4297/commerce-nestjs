import { Body, Controller, Get, Post } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDTO } from './dto/create-level.dto';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  getAllSkills() {
    return this.levelService.getAllLevels();
  }

  @Post()
  createSkill(@Body() data: CreateLevelDTO) {
    return this.levelService.createLevel(data);
  }
}
