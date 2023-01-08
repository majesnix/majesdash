import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
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
import { TagDto } from './dto';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tags')
@ApiTags('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(@Req() req: CustomRequest): Promise<TagEntity[]> {
    return await this.tagService.findAll(req.loggedIn);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TagEntity> {
    return await this.tagService.findOne(id);
  }

  @Post()
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/tags/`);
          } catch (error) {
            await mkdir(`./config/web/images/tags/`, {
              recursive: true,
            });
          }

          return cb(null, `./config/web/images/tags/`);
        },
        filename: (req, file, cb) => {
          return cb(null, `${nanoid()}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() tag: TagDto) {
    return this.tagService.create(tag, file?.filename);
  }

  @Put(':id')
  @ApiBearerAuth('Bearer')
  @ApiConsumes('multipart/form-data')
  @ApiNotFoundResponse({ description: 'Tag not found' })
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: diskStorage({
        destination: async (req: CustomRequest, file, cb) => {
          try {
            await access(`./config/web/images/tags/`);
          } catch (error) {
            await mkdir(`./config/web/images/tags/`, {
              recursive: true,
            });
          }

          return cb(null, `./config/web/images/tags/`);
        },
        filename: (req, file, cb) => {
          return cb(null, `${nanoid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const mimeType = file.mimetype;
        if (
          mimeType !== 'image/jpeg' &&
          mimeType !== 'image/webp' &&
          mimeType !== 'image/png' &&
          mimeType !== 'image/svg+xml' &&
          mimeType !== 'image/gif'
        ) {
          return cb(new Error('Only Images are allowed'), false);
        }
        return cb(null, true);
      },
    })
  )
  async update(
    @Param('id') id: number,
    @Body() tagDto: TagDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.tagService.update(id, {
      ...tagDto,
      icon: file?.filename,
    });
  }

  @Delete(':id')
  @ApiBearerAuth('Bearer')
  async delete(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
