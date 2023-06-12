import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDTO } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCoupons() {
    const allCoupons = await this.prismaService.coupon.findMany();
    return allCoupons;
  }

  public async createCoupon(data: CreateCouponDTO) {
    const createCoupon = await this.prismaService.coupon.create({
      data: {
        name: data.name,
        discount: data.discount,
        expiry: data.expiry,
      },
    });
    return createCoupon;
  }
}
