import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateSkillDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
