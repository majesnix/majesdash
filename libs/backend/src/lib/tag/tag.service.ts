import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { TagRO, TagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async findAll(): Promise<TagsRO> {
    const tags = await this.tagRepository.find();

    return { tags };
  }

  async findOne(id: string): Promise<TagRO> {
    const tag = await this.tagRepository.findOne(id);

    return { tag };
  }

  async create(tagData: CreateTagDto): Promise<TagEntity> {
    const tag = new TagEntity();
    tag.name = tagData.name;

    return await this.tagRepository.save(tag);
  }

  async update(id: number, tagData: CreateTagDto): Promise<TagRO> {
    const toUpdate = await this.tagRepository.findOne(id);
    const updated = Object.assign(toUpdate, tagData);
    const tag = await this.tagRepository.save(updated);
    return { tag };
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tagRepository.delete(id);
  }
}
