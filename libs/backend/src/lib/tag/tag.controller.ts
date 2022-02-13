import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tags')
@ApiTags('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TagEntity> {
    return await this.tagService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  async create(@Body() tagData: CreateTagDto) {
    return this.tagService.create(tagData);
  }

  @Put(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() tileData: CreateTagDto) {
    return this.tagService.update(id, tileData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
