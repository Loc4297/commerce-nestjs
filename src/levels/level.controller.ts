import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDTO } from './dto/create-level.dto';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('levels')
@ApiTags('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  getAllSkills() {
    return this.levelService.getAllLevels();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBody({
    type: CreateLevelDTO,
    examples: {
      level_1: {
        value: {
          name: 'Beginner',
        } as CreateLevelDTO,
      },
    },
  })
  createSkill(@Body() data: CreateLevelDTO, @Req() request) {
    if (request.user.isAdmin) {
      return this.levelService.createLevel(data);
    } else {
      return "You're not allowed to do that!";
    }
  }
}
