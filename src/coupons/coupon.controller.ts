import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDTO } from './dto/create-coupon.dto';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('coupons')
@ApiTags('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getAllCoupons(@Req() request) {
    if (request.user.isAdmin) {
      return this.couponService.getAllCoupons();
    } else {
      return [];
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBody({
    type: CreateCouponDTO,
    examples: {
      coupon_1: {
        value: {
          name: 'locTX',
          discount: 10,
        } as CreateCouponDTO,
      },
    },
  })
  createCoupon(@Body() data: CreateCouponDTO, @Req() request) {
    if (request.user.isAdmin) {
      return this.couponService.createCoupon(data);
    } else {
      return "You're not allowed to do that!";
    }
  }
}
