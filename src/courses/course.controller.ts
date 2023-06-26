import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('course')
@ApiTags('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiQuery({
    required: false,
    name: 'level',
    explode: true,
    example: null,
  })
  @ApiQuery({
    required: false,
    name: 'skill',
    explode: true,
    example: null,
  })
  async getAllCourses(@Query() query) {
    console.log(query);

    let objWhere = {};
    if (query.skill) {
      const skill = JSON.parse(query.skill);
      objWhere = { ...objWhere, skillId: { in: skill } };
    }
    if (query.level) {
      const level = JSON.parse(query.level);
      objWhere = { ...objWhere, levelId: { in: level } };
    }
    return this.courseService.getAllCourses(objWhere);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Post()
  @ApiBody({
    type: CreateCourseDTO,
    examples: {
      course_1: {
        value: {
          name: 'Procedural Python - Lập trình hàm trong Python',
          price: 200,
          levelId: 1,
          skillId: 2,
        } as CreateCourseDTO,
      },
      course_2: {
        value: {
          name: 'Python và thị giác máy tính',
          price: 400,
          levelId: 2,
          skillId: 3,
        } as CreateCourseDTO,
      },
      course_3: {
        value: {
          name: 'Selenium Webdriver với Python',
          price: 1200,
          levelId: 3,
          skillId: 4,
        } as CreateCourseDTO,
      },
    },
  })
  createCourse(@Body() data: CreateCourseDTO, @Req() request) {
    if (request.user.isAdmin) {
      return this.courseService.createCourse(data);
    } else {
      return "You're not allowed to do that!";
    }
  }
}
