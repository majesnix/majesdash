import {
  Get,
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsRO } from './settings.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CustomRequest } from '../middlewares/auth.middleware';
import { emptyDir, access, mkdir } from 'fs-extra';
import { SettingsEntity } from './settings.entity';

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
    FileInterceptor('file', {
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
    @Request() req: CustomRequest
  ) {
    let settings: SettingsEntity;
    if (!file) {
      settings = await this.settingsService.createOrUpdate(req.user.id);
    } else {
      settings = await this.settingsService.createOrUpdate(
        req.user.id,
        true,
        file.originalname
      );
    }

    return {
      settings,
    };
  }
}
