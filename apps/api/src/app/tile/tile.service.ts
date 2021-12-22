import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { TileEntity } from './tile.entity';
import { CreateTileDto } from './dto';

import { TileRO, TilesRO } from './tile.interface';
import { TagEntity } from '../tag/tag.entity';

@Injectable()
export class TileService {
  constructor(
    @InjectRepository(TileEntity)
    private readonly tileRepository: Repository<TileEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async findAll(tags?: string[]): Promise<TilesRO> {
    const qb = getRepository(TileEntity)
      .createQueryBuilder('tile')
      .leftJoinAndSelect('tile.author', 'author');

    qb.where('1 = 1');

    if (tags) {
      qb.andWhere('tile.tagList LIKE :tag', { tag: `%${tags}%` });
    }

    qb.orderBy('tile.created', 'DESC');

    const tiles = await qb.getMany();

    return { tiles };
  }

  async findOne(where: string): Promise<TileRO> {
    const tile = await this.tileRepository.findOne(where);
    return { tile };
  }

  async create(tileData: CreateTileDto): Promise<TileEntity> {
    const tags = await this.tagRepository.find({ where: tileData.tags });
    const tile = new TileEntity();
    tile.applicationName = tileData.applicationName;
    tile.applicationType = tileData.applicationType;
    tile.url = tileData.url;
    tile.colour = tileData.colour;
    tile.icon = tileData.icon;
    tile.tags = tags || [];

    const newTile = await this.tileRepository.save(tile);

    return newTile;
  }

  async update(id: number, tileData: CreateTileDto): Promise<TileRO> {
    const toUpdate = await this.tileRepository.findOne(id);
    const updated = Object.assign(toUpdate, tileData);
    const tile = await this.tileRepository.save(updated);
    return { tile };
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tileRepository.delete(id);
  }
}
