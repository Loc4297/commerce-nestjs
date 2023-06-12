import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  levelId: number;

  @IsNotEmpty()
  @IsNumber()
  skillId: number;
}
