import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { CreateTileDto } from './dto';
import { TileEntity } from './tile.entity';
import { TileRO, TilesRO } from './tile.interface';

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
    tile.title = tileData.applicationName;
    tile.applicationType = null;
    tile.url = tileData.url;
    tile.tags = tags || [];
    tile.color = tileData.color;
    tile.config = JSON.stringify(tileData.config) ?? '';
    tile.icon = '';

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
