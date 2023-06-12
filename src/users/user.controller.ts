import { DataSource } from 'typeorm';
import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
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
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  getDetailUser(@Req() request: Request) {
    console.log(typeof request.user);
    return request.user;
  }
}
