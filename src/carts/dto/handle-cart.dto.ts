import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

// export class CreateCartDTO {
//   @IsNumber()
//   @IsOptional()
//   couponId?: number;

//   @IsNotEmpty()
//   courses: number[];
// }

export class HandleToCartDTO {
  // @IsNumber()
  // @IsOptional()
  // couponId?: number;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}
