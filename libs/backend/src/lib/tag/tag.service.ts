import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { TileEntity } from '../tile/tile.entity';
import { TagDto } from './dto/tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(TileEntity)
    private readonly tileRepository: Repository<TileEntity>
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async findOne(id: string): Promise<TagEntity> {
    return await this.tagRepository.findOne(id);
  }

  async create(tagDto: TagDto, filename?: string): Promise<TagEntity> {
    const tag = new TagEntity();
    tag.name = tagDto.name;
    tag.icon = filename;
    tag.color = tagDto.color;
    tag.order = tagDto.order;

    return await this.tagRepository.save(tag);
  }

  async update(id: number, tagDto: TagDto): Promise<TagEntity> {
    const toUpdate = await this.tagRepository.findOne(id);

    const tiles = await this.tileRepository.find({
      where: {
        tagId: IsNull(),
      },
    });
    const tags = await this.tagRepository.find();

    toUpdate.name = tagDto.name;
    toUpdate.color = tagDto.color;
    toUpdate.icon = tagDto.icon;
    toUpdate.order = tagDto.order;

    // update order value of other tiles/tags
    for (const tile of tiles) {
      if (tile.order >= tagDto.order) {
        tile.order = tile.order + 1;
        await this.tileRepository.save(tile);
      }
    }
    for (const tag of tags) {
      if (tag.order >= tagDto.order) {
        tag.order = tag.order + 1;
        await this.tagRepository.save(tag);
      }
    }

    return await this.tagRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tagRepository.delete(id);
  }
}
