import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDTO } from './dto/create-coupon.dto';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get()
  getAllCoupons() {
    return this.couponService.getAllCoupons();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  createCoupon(@Body() data: CreateCouponDTO, @Req() request) {
    if (request.user.isAdmin) {
      return this.couponService.createCoupon(data);
    } else {
      return [];
    }
  }
}
