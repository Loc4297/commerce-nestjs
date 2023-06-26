import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandleToCartDTO } from './dto/handle-cart.dto';
// import { UpdateCartDTO } from './dto/update-cart.dto';
import { User } from '@prisma/client';
import { ApplyCouponDTO } from './dto/apply-coupon.dto';
// import { CreateCouponDTO } from 'src/coupons/dto/create-coupon.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCarts() {
    const allCarts = await this.prismaService.cart.findMany();
    return allCarts;
  }

  // async createCart(userId: string, data: CreateCartDTO, subTotalPrice: number, totalPrice: number) {
  // public async createCart(data: CreateCartDTO, request) {
  //   const { courses, couponId } = data;
  //   try {
  //     const user = request.user;
  //     const courseArr = await this.prismaService.course.findMany({
  //       where: {
  //         id: { in: courses },
  //       },
  //     });

  //     const validCoupon = await this.prismaService.coupon.findFirst({
  //       where: {
  //         id: couponId,
  //       },
  //     });

  //     const cartTotal = courseArr.reduce((total, value) => {
  //       return total + value.price;
  //     }, 0);

  //     let cartData;
  //     if (validCoupon) {
  //       const totalAfterDiscount = (
  //         cartTotal -
  //         (cartTotal * validCoupon.discount) / 100
  //       ).toFixed(0);

  //       cartData = {
  //         userId: user.id,
  //         courses: courseArr.map((value) => {
  //           return { courseId: value };
  //         }),
  //         couponId,
  //         cartTotal,
  //         totalAfterDiscount: Number(totalAfterDiscount),
  //       };
  //       return await this.prismaService.cart.create({
  //         data: {
  //           cartTotal,
  //           user: { connect: { id: user.id } },
  //           totalAfterDiscount: cartTotal,
  //           coupons: { connect: { id: couponId } },
  //           courses: {
  //             create: courseArr.map((value) => {
  //               return { courses: { connect: { id: value.id } } };
  //             }),
  //           },
  //         },
  //       });
  //     } else {
  //       cartData = {
  //         userId: user.id,
  //         courses: courseArr.map((value) => {
  //           return { course: value };
  //         }),
  //         couponId,
  //         cartTotal,
  //         totalAfterDiscount: cartTotal,
  //       };
  //       return await this.prismaService.cart.create({
  //         data: {
  //           cartTotal,
  //           user: { connect: { id: user.id } },
  //           totalAfterDiscount: cartTotal,
  //           courses: {
  //             create: courseArr.map((value) => {
  //               return { courses: { connect: { id: value.id } } };
  //             }),
  //           },
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.log(
  //       '🚀 ~ file: cart.service.ts:65 ~ CartService ~ createCart ~ error:',
  //       error,
  //     );
  //     return [];
  //   }
  // }

  public async addToCart(data: HandleToCartDTO, user: User) {
    try {
      let cart = await this.prismaService.cart.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (!cart)
        cart = await this.prismaService.cart.create({
          data: { userId: user.id, cartTotal: 0, totalAfterDiscount: 0 },
        });
      console.log('🚀 ~ file: cart.service.ts:109 ~ addToCart ~ cart:', cart);

      await this.prismaService.courseInCart.create({
        data: {
          cartId: cart.id,
          courseId: data.courseId,
        },
      });

      const course = await this.prismaService.course.findUnique({
        where: { id: data.courseId },
      });
      const total = this.calculate(cart.cartTotal, course.price, 'plus');
      await this.prismaService.cart.update({
        where: { id: cart.id },
        data: {
          cartTotal: total,
          totalAfterDiscount: total,
        },
      });
      return { statusCode: 200 };
    } catch (error) {
      throw error;
    }
  }

  public async removeFromCart(data: HandleToCartDTO, user: User) {
    try {
      const cart = await this.prismaService.cart.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      await this.prismaService.courseInCart.delete({
        where: {
          courseId_cartId: {
            cartId: cart.id,
            courseId: data.courseId,
          },
        },
      });
      const course = await this.prismaService.course.findUnique({
        where: { id: data.courseId },
      });
      const total = this.calculate(cart.cartTotal, course.price, 'minus');
      await this.prismaService.cart.update({
        where: { id: cart.id },
        data: {
          cartTotal: total,
          totalAfterDiscount: total,
        },
      });
      return { statusCode: 200 };
    } catch (error) {
      throw error;
    }
  }

  public async applyCoupon(data: ApplyCouponDTO, user: User) {
    try {
      const cart = await this.prismaService.cart.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const coupon = await this.prismaService.coupon.findUnique({
        where: { name: data.name },
      });
      const totalAfterDiscount =
        cart.cartTotal - (cart.cartTotal * coupon.discount) / 100;
      await this.prismaService.cart.update({
        where: { id: cart.id },
        data: {
          totalAfterDiscount: totalAfterDiscount,
        },
      });
      return { statusCode: 200 };
    } catch (error) {
      throw error;
    }
  }

  public async getCartByUser(userId: number) {
    return this.prismaService.cart.findFirst({
      where: {
        userId: userId,
      },
      include: { courses: { include: { courses: true } } },
    });
  }

  // public async updateCart(data: UpdateCartDTO, request) {
  //   // return this.prismaService.cart.updateMany({
  //   //   where: {
  //   //     userId: id,
  //   //   },
  //   //   data: { ...data },
  //   // });
  //   const { courses, couponId } = data;
  // }

  calculate = (
    oldPrice: number,
    currentPrice: number,
    type: 'plus' | 'minus',
  ) => {
    switch (type) {
      case 'minus':
        return oldPrice - currentPrice;
      case 'plus':
        return oldPrice + currentPrice;
    }
  };
}

