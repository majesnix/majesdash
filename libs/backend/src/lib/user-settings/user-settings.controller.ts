import { UserSettings } from '@majesdash/data';
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
import { access, mkdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../auth.middleware';
import { UserSettingsEntity } from './user-settings.entity';
import { UserSettingsRO } from './user-settings.interface';
import { UserSettingsService } from './user-settings.service';

@Controller('settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get()
  async findMe(@Request() req: CustomRequest): Promise<UserSettingsRO> {
    const settings = await this.userSettingsService.findOne(req.user.id);
    return {
      settings,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('background', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/${req.user.id}`);
            await unlink(
              `./config/web/images/${req.user.id}/${req.user.settings.backgroundName}`
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
    @UploadedFile() file: Express.Multer.File,
    @Request() req: CustomRequest,
    @Body('settings') userSettings: string
  ) {
    let settings: UserSettingsEntity;
    if (!file) {
      settings = await this.userSettingsService.createOrUpdate(
        req.user.id,
        undefined,
        JSON.parse(userSettings) as UserSettings
      );
    } else {
      settings = await this.userSettingsService.createOrUpdate(
        req.user.id,
        file.filename,
        JSON.parse(userSettings) as UserSettings
      );
    }

    return {
      settings,
    };
  }
}
