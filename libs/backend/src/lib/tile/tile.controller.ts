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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { access, mkdir } from 'fs-extra';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { CustomRequest } from '../admin-auth.middleware';
import { TileDto } from './dto';
import { TileEntity } from './tile.entity';
import { TileService } from './tile.service';

@ApiTags('tiles')
@Controller('tiles')
export class TileController {
  constructor(private readonly tileService: TileService) {}

  @Get()
  async findAll(@Query() tags: string[]): Promise<TileEntity[]> {
    return await this.tileService.findAll(tags);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TileEntity> {
    return await this.tileService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
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
    @Body() tile: TileDto
  ): Promise<TileEntity> {
    return this.tileService.create(tile, file?.filename);
  }

  @Put(':id')
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
  @ApiNotFoundResponse({ description: 'Tile not found' })
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
    @Body() tileDto: TileDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.tileService.update(id, {
      ...tileDto,
      icon: file?.filename,
    });
  }

  @Delete(':id')
  @ApiBearerAuth('Bearer')
  async delete(@Param('id') id: number) {
    return this.tileService.delete(id);
  }
}
