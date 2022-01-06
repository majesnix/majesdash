import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CustomRequest } from '../auth.middleware';
import { SystemSettingsService } from './system-settings.service';

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly systemSettingsService: SystemSettingsService) {}

  @Get()
  async getSystemSettings() {
    return { settings: await this.systemSettingsService.findOne() };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('background', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          const files = (
            await readdir('./config/images/', {
              withFileTypes: true,
            })
          ).filter((file) => file.isFile());
          for (const file of files) {
            await unlink(`./config/images/${file.name}`);
          }
          return cb(null, `./config/images/`);
        },
        filename: (req, file, cb) => {
          return cb(null, `background${extname(file.originalname)}`);
        },
      }),
    })
  )
  async updateSystemSettings(@UploadedFile() file: Express.Multer.File) {
    const systemSettings = await this.systemSettingsService.update({
      background: file.filename,
    });

    return {
      settings: systemSettings,
    };
  }
}
