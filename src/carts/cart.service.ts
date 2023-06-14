import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDTO } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCarts() {
    const allCarts = await this.prismaService.cart.findMany();
    return allCarts;
  }

  public async createCart(data: CreateCartDTO, request) {
    const { courses, couponId } = data;
    try {
      const user = request.user;
      const courseArr = await this.prismaService.course.findMany({
        where: {
          id: { in: courses },
        },
      });

      const validCoupon = await this.prismaService.coupon.findFirst({
        where: {
          id: couponId,
        },
      });

      const cartTotal = courseArr.reduce((total, value) => {
        return total + value.price;
      }, 0);

      if (validCoupon) {
        const totalAfterDiscount = (
          cartTotal -
          (cartTotal * validCoupon.discount) / 100
        ).toFixed(0);

        const cartData = {
          userId: user.id,
          courses: courseArr.map((value) => {
            return { course: value };
          }),
          couponId,
          cartTotal,
          totalAfterDiscount: totalAfterDiscount,
        };
        console.log(cartData);
      } else {
        const cartData = {
          userId: user.id,
          courses: courseArr.map((value) => {
            return { course: value };
          }),
          couponId,
          cartTotal,
          totalAfterDiscount: cartTotal,
        };
        console.log(cartData);
      }
    } catch (error) {
      return [];
    }
  }
}
