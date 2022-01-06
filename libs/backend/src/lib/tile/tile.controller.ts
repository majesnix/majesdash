import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTileDto } from './dto';
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
  async create(@Body('tile') tileData: CreateTileDto) {
    return this.tileService.create(tileData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('tile') tileData: CreateTileDto) {
    return this.tileService.update(id, tileData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.tileService.delete(id);
  }
}
