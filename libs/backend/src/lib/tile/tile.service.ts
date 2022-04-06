import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs-extra';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { TileDto } from './dto';
import { TileEntity } from './tile.entity';

@Injectable()
export class TileService {
  constructor(
    @InjectRepository(TileEntity)
    private readonly tileRepository: Repository<TileEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async findAll(tag?: string): Promise<TileEntity[]> {
    return await this.tileRepository.find({
      where: {
        tag: tag ?? IsNull(),
      },
    });
  }

  async findAllAdmin(): Promise<TileEntity[]> {
    return await this.tileRepository.find();
  }

  async findOne(where: string): Promise<TileEntity> {
    return await this.tileRepository.findOne(where);
  }

  async create(tileDto: TileDto, filename?: string): Promise<TileEntity> {
    let tag: TagEntity | undefined;
    if (tileDto.tag) {
      tag = await this.tagRepository.findOne({ where: { id: tileDto.tag } });
    }

    const tile = new TileEntity();
    tile.title = tileDto.title;
    tile.type = tileDto.type;
    tile.color = tileDto.color;
    tile.icon = filename;
    tile.url = tileDto.url;
    tile.order = 0;
    tile.tag = tag ?? undefined;
    tile.config = JSON.stringify(tileDto.config) ?? '{}';

    const tileEntity = await this.tileRepository.save(tile);

    if (tag) {
      if (tag.tiles) {
        tag.tiles = [...tag.tiles, tileEntity];
      } else {
        tag.tiles = [tileEntity];
      }

      await this.tagRepository.save(tag);
    }

    return tileEntity;
  }

  async update(id: number, tileDto: TileDto): Promise<TileEntity> {
    const toUpdate = await this.tileRepository.findOne(id);

    if (!toUpdate)
      new HttpException({ message: 'Tile not found' }, HttpStatus.NOT_FOUND);

    // unlink old icon
    if (tileDto.icon && toUpdate.icon) {
      await unlink(`./config/web/images/tiles/${toUpdate.icon}`);
    }

    const updated = Object.assign(toUpdate, tileDto);

    return await this.tileRepository.save(updated);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tileRepository.delete(id);
  }
}
