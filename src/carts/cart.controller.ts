import { CartService } from './cart.service';
import { Controller } from '@nestjs/common';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
