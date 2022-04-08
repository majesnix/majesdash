import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
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
    const updated = Object.assign(toUpdate, tagDto);
    return await this.tagRepository.save(updated);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tagRepository.delete(id);
  }
}
