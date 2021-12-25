import {
  Get,
  Controller,
  Body,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';

import { TagRO, TagsRO } from './tag.interface';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagsRO> {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TagRO> {
    return await this.tagService.findOne(id);
  }

  @Post()
  async create(@Body('tag') tagData: CreateTagDto) {
    return this.tagService.create(tagData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('tile') tileData: CreateTagDto) {
    return this.tagService.update(id, tileData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
