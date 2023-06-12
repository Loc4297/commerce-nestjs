import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsDate } from 'class-validator';

export class CreateCouponDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  @IsDate()
  expiry: Date;
}
