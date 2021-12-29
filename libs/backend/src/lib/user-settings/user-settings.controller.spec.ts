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
import { access, emptyDir, mkdir } from 'fs-extra';
import { diskStorage } from 'multer';
import { CustomRequest } from '../auth.middleware';
import { UserSettingsEntity } from './user-settings.entity';
import { UserSettingsRO } from './user-settings.interface';
import { UserSettingsService } from './user-settings.service';

@Controller('user-settings')
export class SettingsController {
  constructor(private readonly settingsService: UserSettingsService) {}

  @Get()
  async findMe(@Request() req: CustomRequest): Promise<UserSettingsRO> {
    const settings = await this.settingsService.findOne(req.user.id);
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
            await access(`./config/images/${req.user.id}`);
            await emptyDir(`./config/images/${req.user.id}`);
          } catch (error) {
            await mkdir(`./config/images/${req.user.id}`, { recursive: true });
          }
          return cb(null, `./config/images/${req.user.id}`);
        },
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    })
  )
  async settings(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: CustomRequest,
    @Body('settings') userSettings: string
  ) {
    let settings: UserSettingsEntity;
    if (!file) {
      settings = await this.settingsService.createOrUpdate(req.user.id);
    } else {
      settings = await this.settingsService.createOrUpdate(
        req.user.id,
        file.originalname,
        JSON.parse(userSettings) as UserSettings
      );
    }

    return {
      settings,
    };
  }
}
