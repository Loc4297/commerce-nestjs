import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

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
  @IsOptional()
  isAdmin?: boolean;
}
