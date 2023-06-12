import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateLevelDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
