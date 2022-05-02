import { IUserWithToken } from '@majesdash/data';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { access, mkdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../auth.middleware';
import {
  AdminUpdateUserDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller()
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @ApiBearerAuth('Bearer')
  async findMe(@User('email') email: string): Promise<IUserWithToken> {
    return await this.userService.findByEmail(email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('user')
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/${req.user.id}`);
            await unlink(
              `./config/web/images/${req.user.id}/${req.user.avatar}`
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
      fileFilter: (req, file, cb) => {
        const mimeType = file.mimetype;
        if (
          mimeType !== 'image/jpeg' &&
          mimeType !== 'image/webp' &&
          mimeType !== 'image/png' &&
          mimeType !== 'image/svg+xml' &&
          mimeType !== 'image/gif'
        ) {
          return cb(new Error('Only Images are allowed'), false);
        }
        return cb(null, true);
      },
    })
  )
  async update(
    @UploadedFile() file: Express.Multer.File,
    @User('id') userId: number,
    @Body() userDto: UpdateUserDto
  ) {
    return await this.userService.update(userId, userDto, file?.filename);
  }

  @Get('users')
  @ApiBearerAuth('Bearer')
  async getUsers() {
    return this.userService.findAll();
  }

  @Post('users')
  @ApiBearerAuth('Bearer')
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('users')
  @ApiBearerAuth('Bearer')
  async updateUser(@Body() userDto: AdminUpdateUserDto) {
    return await this.userService.updateAsAdmin(userDto);
  }

  @Put('users/resetPassword')
  @ApiBearerAuth('Bearer')
  async resetPassword(@Body() id: number) {
    return await this.userService.resetPassword(id);
  }

  @Put('users/deleteAvatar')
  @ApiBearerAuth('Bearer')
  async deleteAvatar(@Body() id: number) {
    return await this.userService.deleteAvatar(id);
  }

  @Delete('users/:id')
  @ApiBearerAuth('Bearer')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  @Post('users/login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<IUserWithToken> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = this.userService.generateJWT(_user);
    const { id, email, username, avatar, isAdmin } = _user;
    const user = { id, email, token, username, avatar, isAdmin };
    return user;
  }
}
