import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { access, mkdir } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../admin-auth.middleware';
import { TileRO, TilesRO } from './tile.interface';
import { TileService } from './tile.service';

@Controller('tiles')
export class TileController {
  constructor(private readonly tileService: TileService) {}

  @Get()
  async findAll(@Query() tags: string[]): Promise<TilesRO> {
    return await this.tileService.findAll(tags);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TileRO> {
    return await this.tileService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/tiles/`);
          } catch (error) {
            await mkdir(`./config/web/images/tiles/`, {
              recursive: true,
            });
          }

          return cb(null, `./config/web/images/tiles/`);
        },
        filename: (req, file, cb) => {
          return cb(null, `${nanoid()}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('tile') tileData: string
  ) {
    return this.tileService.create(JSON.parse(tileData), file?.filename);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/tiles/`);
          } catch (error) {
            await mkdir(`./config/web/images/tiles/`, {
              recursive: true,
            });
          }

          return cb(null, `./config/web/images/tiles/`);
        },
        filename: (req, file, cb) => {
          return cb(null, `${nanoid()}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async update(
    @Param('id') id: number,
    @Body('tile') tileData: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.tileService.update(id, {
      ...JSON.parse(tileData),
      icon: file.filename,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.tileService.delete(id);
  }
}
