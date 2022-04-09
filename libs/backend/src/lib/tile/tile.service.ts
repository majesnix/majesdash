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
        tagId: tag ?? IsNull(),
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
    tile.order = tileDto.order;
    tile.tag = tag ?? undefined;
    tile.config = JSON.stringify(tileDto.config) ?? '{}';

    const tileEntity = await this.tileRepository.save(tile);

    return tileEntity;
  }

  async update(id: number, tileDto: TileDto): Promise<TileEntity> {
    const toUpdate = await this.tileRepository.findOne(id);

    let tag: TagEntity | undefined;
    if (tileDto.tag) {
      tag = await this.tagRepository.findOne({
        where: { id: parseInt(tileDto.tag) },
      });
    }
    if (tileDto.tagId) {
      tag = await this.tagRepository.findOne({
        where: { id: parseInt(tileDto.tagId) },
      });
    }

    const tiles = await this.tileRepository.find({
      where: {
        tagId: tag?.id ?? IsNull(),
      },
    });
    const tags = await this.tagRepository.find();

    if (!toUpdate)
      new HttpException({ message: 'Tile not found' }, HttpStatus.NOT_FOUND);

    // unlink old icon
    if (tileDto.icon && toUpdate.icon) {
      await unlink(`./config/web/images/tiles/${toUpdate.icon}`);
    }

    toUpdate.title = tileDto.title;
    toUpdate.type = tileDto.type;
    toUpdate.color = tileDto.color;
    toUpdate.icon = tileDto.icon;
    toUpdate.url = tileDto.url;
    toUpdate.order = tileDto.order ?? toUpdate.order ?? 0;
    toUpdate.tag = tag ?? null;
    toUpdate.config = JSON.stringify(tileDto.config) ?? '{}';

    // update order value of other tiles/tags
    for (const tile of tiles) {
      if (tile.order >= tileDto.order) {
        tile.order = tile.order + 1;
        await this.tileRepository.save(tile);
      }
    }
    for (const tag of tags) {
      if (tag.order >= tileDto.order) {
        tag.order = tag.order + 1;
        await this.tagRepository.save(tag);
      }
    }

    return await this.tileRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tileRepository.delete(id);
  }
}
