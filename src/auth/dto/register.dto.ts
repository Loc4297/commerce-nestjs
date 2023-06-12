import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;
}
