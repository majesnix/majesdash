import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { access, mkdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../auth.middleware';
import { UserSettingsDto } from './dto';
import { UserSettingsEntity } from './user-settings.entity';
import { UserSettingsService } from './user-settings.service';

@Controller('settings')
@ApiTags('settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get()
  @ApiBearerAuth('Bearer')
  async findUserSettings(
    @Request() req: CustomRequest
  ): Promise<UserSettingsEntity> {
    return await this.userSettingsService.findOne(req.user.id);
  }

  @Post()
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('background', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/${req.user.id}`);
            await unlink(
              `./config/web/images/${req.user.id}/${req.user.settings.background}`
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
  async updateSettings(
    @Request() req: CustomRequest,
    @Body() userSettingsDto: UserSettingsDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return await this.userSettingsService.createOrUpdate(
      req.user.id,
      userSettingsDto,
      file?.filename
    );
  }
}
