import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ApplyCouponDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsNotEmpty()
  // courses: number[];
}
