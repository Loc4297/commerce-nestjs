import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { CreateCartDTO } from './dto/create-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getAllCarts(@Req() request) {
    if (request.user.isAdmin) {
      return this.cartService.getAllCarts();
    } else {
      return [];
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createCart(@Body() data: CreateCartDTO, @Req() request) {
    return this.cartService.createCart(data, request);
  }
}
