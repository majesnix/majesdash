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
    const qb = getRepository(TileEntity).createQueryBuilder('tile');

    qb.where('1 = 1');

    if (tags) {
      qb.andWhere('tile.tags LIKE :tag', { tag: `%${tags}%` });
    }

    qb.orderBy('tile.created', 'DESC');

    return { tiles: await this.tileRepository.find() };
  }

  async findOne(where: string): Promise<TileRO> {
    return { tile: await this.tileRepository.findOne(where) };
  }

  async create(tileData: CreateTileDto): Promise<TileEntity> {
    let tags;
    if (tileData.tags) {
      tags = await this.tagRepository.find({ where: tileData.tags });
    }
    const tile = new TileEntity();
    tile.applicationName = tileData.applicationName;
    tile.applicationType = tileData.applicationType;
    tile.url = tileData.url;
    tile.colour = tileData.colour;
    tile.icon = tileData.icon;
    tile.tags = tags || [];

    return await this.tileRepository.save(tile);
  }

  async update(id: number, tileData: CreateTileDto): Promise<TileRO> {
    const toUpdate = await this.tileRepository.findOne(id);
    const updated = Object.assign(toUpdate, tileData);

    return { tile: await this.tileRepository.save(updated) };
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tileRepository.delete(id);
  }
}
