import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Param,
  Controller,
} from '@nestjs/common';
import { TileService } from './tile.service';
import { CreateTileDto } from './dto';
import { TilesRO, TileRO } from './tile.interface';

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
    // Todo: update slug also when title gets changed
    return this.tileService.update(id, tileData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.tileService.delete(id);
  }
}
