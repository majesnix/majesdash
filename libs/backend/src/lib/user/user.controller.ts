import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user')
  async update(
    @User('id') userId: number,
    @Body('user') userData: UpdateUserDto
  ) {
    return await this.userService.update(userId, userData);
  }

  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = this.userService.generateJWT(_user);
    const { id, email, username, image, isAdmin } = _user;
    const user = { id, email, token, username, image, isAdmin };
    return { user };
  }
}
