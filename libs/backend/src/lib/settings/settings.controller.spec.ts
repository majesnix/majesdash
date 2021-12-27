import {
  Get,
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  Request,
  Body,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsRO } from './settings.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CustomRequest } from '../auth.middleware';
import { emptyDir, access, mkdir } from 'fs-extra';
import { SettingsEntity } from './settings.entity';
import { Settings } from '@majesdash/data';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async findMe(@Request() req: CustomRequest): Promise<SettingsRO> {
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
    let settings: SettingsEntity;
    if (!file) {
      settings = await this.settingsService.createOrUpdate(req.user.id);
    } else {
      settings = await this.settingsService.createOrUpdate(
        req.user.id,
        file.originalname,
        JSON.parse(userSettings) as Settings
      );
    }

    return {
      settings,
    };
  }
}
