import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllCarts() {
    const allCarts = await this.prismaService.cart.findMany();
    return allCarts;
  }
}
