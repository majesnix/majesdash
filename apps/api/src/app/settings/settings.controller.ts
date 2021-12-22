import {
  Get,
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsRO } from './settings.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('settings')
  async findMe(): Promise<SettingsRO> {
    const settings = await this.settingsService.getSettings();
    return {
      settings,
    };
  }

  @Post('settings')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './config/images',
        filename: (req, file, cb) => {
          return cb(null, `background${extname(file.originalname)}`);
        },
      }),
    })
  )
  async settings(@UploadedFile() file: Express.Multer.File) {
    const settings = await this.settingsService.getSettings();
  }
}
