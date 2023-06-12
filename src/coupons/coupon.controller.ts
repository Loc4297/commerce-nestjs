import { Body, Controller, Get, Post } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDTO } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  getAllCoupons() {
    return this.couponService.getAllCoupons();
  }

  @Post()
  createCoupon(@Body() data: CreateCouponDTO) {
    return this.couponService.createCoupon(data);
  }
}
