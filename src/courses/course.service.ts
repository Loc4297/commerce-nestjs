import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCourses() {
    const allCourses = await this.prismaService.course.findMany();
    return allCourses;
  }
}
