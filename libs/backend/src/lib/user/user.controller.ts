import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { access, mkdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../auth.middleware';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './user.decorator';
import { UserRO } from './user.interface';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Post('user')
  @UseInterceptors(
    FileInterceptor('profilePic', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/${req.user.id}`);
            await unlink(
              `./config/web/images/${req.user.id}/${req.user.image}`
            );
          } catch (error) {
            await mkdir(`./config/web/images/${req.user.id}`, {
              recursive: true,
            });
          }
          return cb(null, `./config/web/images/${req.user.id}`);
        },
        filename: (req, file, cb) => {
          return cb(null, `${nanoid(5)}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @User('id') userId: number,
    @Body('user') userData: string
  ) {
    return {
      user: await this.userService.update(
        userId,
        JSON.parse(userData),
        file?.filename
      ),
    };
  }

  @Get('users')
  async getUsers() {
    return this.userService.findAll();
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
