import { Controller } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
}