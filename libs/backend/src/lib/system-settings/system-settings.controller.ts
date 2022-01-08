import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { access, mkdir, readdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
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
          try {
            await access(`./config/web/images/`);
            const files = (
              await readdir('./config/web/images/', {
                withFileTypes: true,
              })
            ).filter((file) => file.isFile());
            for (const file of files) {
              await unlink(`./config/web/images/${file.name}`);
            }
          } catch (error) {
            await mkdir(`./config/web/images/`, {
              recursive: true,
            });
          }

          return cb(null, `./config/web/images/`);
        },
        filename: (req, file, cb) => {
          return cb(null, `${nanoid()}${extname(file.originalname)}`);
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
