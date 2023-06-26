import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDTO } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCourses(objWhere) {
    try {
      const allCourses = await this.prismaService.course.findMany({
        where: objWhere,
      });
      return allCourses;
    } catch (error) {
      return error;
    }
  }

  public async createCourse(data: CreateCourseDTO) {
    try {
      const createCourse = await this.prismaService.course.create({
        data: {
          name: data.name,
          price: data.price,
          levelId: data.levelId,
          skillId: data.skillId,
        },
        include: { skill: true, level: true },
      });
      return createCourse;
    } catch (error) {
      return error;
    }
  }
}


