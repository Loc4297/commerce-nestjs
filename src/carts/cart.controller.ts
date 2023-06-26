import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { HandleToCartDTO } from './dto/handle-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplyCouponDTO } from './dto/apply-coupon.dto';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get()
  getAllCarts(@Req() request) {
    if (request.user.isAdmin) {
      return this.cartService.getAllCarts();
    } else {
      return "You're not allowed to do that!";
    }
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @ApiBearerAuth()
  // @Post()
  // async createCart(@Body() data: CreateCartDTO, @Req() request) {
  //   return this.cartService.createCart(data, request);
  // }
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Post('add-to-cart')
  @ApiBody({
    type: HandleToCartDTO,
    examples: {
      item_1: {
        value: {
          courseId: 1,
        } as HandleToCartDTO,
      },
      item_2: {
        value: {
          couponId: 1,
          courseId: 4,
        } as HandleToCartDTO,
      },
    },
  })
  async addCart(@Body() data: HandleToCartDTO, @Req() request) {
    return this.cartService.addToCart(data, request.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Post('remove-from-cart')
  @ApiBody({
    type: HandleToCartDTO,
    examples: {
      item_1: {
        value: {
          courseId: 1,
        } as HandleToCartDTO,
      },
      item_2: {
        value: {
          // couponId: 1,
          courseId: 4,
        } as HandleToCartDTO,
      },
    },
  })
  async removeCart(@Body() data: HandleToCartDTO, @Req() request) {
    return this.cartService.removeFromCart(data, request.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Post('apply-coupon')
  @ApiBody({
    type: ApplyCouponDTO,
    examples: {
      coupon_1: {
        value: {
          name: 'locTX',
        } as ApplyCouponDTO,
      },
    },
  })
  async applyCoupon(@Body() data: ApplyCouponDTO, @Req() request) {
    return this.cartService.applyCoupon(data, request.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Get('me')
  getCartByUser(@Req() request) {
    return this.cartService.getCartByUser(request.user.id);
  }
}
