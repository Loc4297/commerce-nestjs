import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getDetailUser(@Param() params: { id: string }) {
    try {
      const id = JSON.parse(params.id);
      return this.userService.getDetailUser(id);
    } catch (error) {
      return [];
    }
  }

  // @Patch(':id')
  // updateUser(
  //   @Param() params: { id: string },
  //   @Body() updateData: UpdateUserDTO,
  // ) {
  //   try {
  //     const id = JSON.parse(params.id);
  //   } catch (error) {}
  // }
}
