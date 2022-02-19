import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { access, mkdir, readdir, unlink } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../auth.middleware';
import { SystemSettingsUpdateDto } from './dto/system-settings-update.dto';
import { SystemSettingsService } from './system-settings.service';

@Controller('system-settings')
@ApiTags('system-settings')
export class SystemSettingsController {
  constructor(private readonly systemSettingsService: SystemSettingsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getSystemSettings() {
    return await this.systemSettingsService.findOne();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
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
  async updateSystemSettings(
    @UploadedFile() file: Express.Multer.File,
    @Body() systemSettingsData: SystemSettingsUpdateDto
  ) {
    const systemSettings = await this.systemSettingsService.update(
      systemSettingsData,
      file?.filename
    );

    return systemSettings;
  }
}
