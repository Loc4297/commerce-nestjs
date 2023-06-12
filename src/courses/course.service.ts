import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCourses() {
    const allCourses = await this.prismaService.course.findMany();
    return allCourses;
  }

  public async createCourse(data: CreateCourseDTO) {
    const createCourse = await this.prismaService.course.create({
      data: {
        name: data.name,
        price: data.price,
        levelId: data.levelId,
        skillId: data.skillId,
      },
    });
    return createCourse;
  }
}
