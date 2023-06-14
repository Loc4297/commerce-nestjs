import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getAllUsers(@Req() request) {
    if (request.user.isAdmin) {
      return this.userService.getAllUsers();
    } else {
      return [];
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  getDetailUser(@Req() request: Request) {
    return request.user;
  }
}
