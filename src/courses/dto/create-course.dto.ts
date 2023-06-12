import { IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  level: string;

  @IsNotEmpty()
  skill: string;
}
