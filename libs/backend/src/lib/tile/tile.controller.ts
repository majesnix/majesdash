import {
  Body,
  ClassSerializerInterceptor,
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query('tag') tag: string | undefined): Promise<TileEntity[]> {
    return await this.tileService.findAll(tag);
  }

  @Get('all')
  @ApiBearerAuth('Bearer')
  async adminFindAll(): Promise<TileEntity[]> {
    return await this.tileService.findAllAdmin();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TileEntity> {
    return await this.tileService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
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
    @Body() tileDto: TileDto
  ): Promise<TileEntity> {
    return this.tileService.create(tileDto, file?.filename);
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
