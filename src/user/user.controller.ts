import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: UserCreateDto): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string): Promise<UserEntity> {
    return this.userService.getUser(userId);
  }

  @Get('/:userId/avatar')
  getUserAvatar(@Param('userId') userId: string) {
    return this.userService.getUserAvatar(userId);
  }

  @Delete('/:userId/avatar')
  deleteUserAvatar(@Param('userId') userId: string) {
    return this.userService.deleteUserAvatar(userId);
  }
}
