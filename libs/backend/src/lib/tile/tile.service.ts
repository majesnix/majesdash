import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs-extra';
import { DeleteResult, getRepository, Repository } from 'typeorm';
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

  async findAll(tags?: string[]): Promise<TileEntity[]> {
    const qb = getRepository(TileEntity).createQueryBuilder('tile');

    qb.where('1 = 1');

    if (tags) {
      qb.andWhere('tile.tags LIKE :tag', { tag: `%${tags}%` });
    }

    qb.orderBy('tile.created', 'DESC');

    return await this.tileRepository.find();
  }

  async findOne(where: string): Promise<TileEntity> {
    return await this.tileRepository.findOne(where);
  }

  async create(tileDto: TileDto, filename?: string): Promise<TileEntity> {
    let tags;
    if (tileDto.tags?.length) {
      tags = await this.tagRepository.find({ where: tileDto.tags });
    }

    const tile = new TileEntity();
    tile.title = tileDto.title;
    tile.type = tileDto.type;
    tile.color = tileDto.color;
    tile.icon = filename;
    tile.url = tileDto.url;
    tile.order = 0;
    tile.tags = tags ?? [];
    tile.config = JSON.stringify(tileDto.config) ?? '{}';

    return await this.tileRepository.save(tile);
  }

  async update(id: number, tileDto: TileDto): Promise<TileEntity> {
    const toUpdate = await this.tileRepository.findOne(id);

    if (!toUpdate)
      new HttpException({ message: 'Tile not found' }, HttpStatus.NOT_FOUND);

    // unlink old icon
    if (toUpdate.icon) {
      await unlink(`./config/web/images/tiles/${toUpdate.icon}`);
    }

    const updated = Object.assign(toUpdate, tileDto);

    return await this.tileRepository.save(updated);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tileRepository.delete(id);
  }
}
