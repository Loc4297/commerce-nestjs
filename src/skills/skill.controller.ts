import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDTO } from './dto/create-skill.dto';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('skills')
@ApiTags('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getAllSkills() {
    return this.skillService.getAllSkills();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBody({
    type: CreateSkillDTO,
    examples: {
      skill_1: {
        value: {
          name: 'Reading',
        } as CreateSkillDTO,
      },
    },
  })
  createSkill(@Body() data: CreateSkillDTO, @Req() request) {
    if (request.user.isAdmin) {
      return this.skillService.createSkill(data);
    } else {
      return "You're not allowed to do that!";
    }
  }
}
