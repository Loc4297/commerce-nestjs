import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  createCourse(@Body() data: CreateCourseDTO, @Req() request) {
    if (request.user.isAdmin) {
      return this.courseService.createCourse(data);
    } else {
      return "You're not allowed to do that!";
    }
  }
}
