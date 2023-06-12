import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Post()
  createCourse(@Body() data: CreateCourseDTO) {
    return this.courseService.createCourse(data);
  }
}
