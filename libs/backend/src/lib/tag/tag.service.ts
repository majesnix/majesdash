import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
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

  async create(tagData: CreateTagDto): Promise<TagEntity> {
    const tag = new TagEntity();
    tag.name = tagData.name;

    return await this.tagRepository.save(tag);
  }

  async update(id: number, tagData: CreateTagDto): Promise<TagEntity> {
    const toUpdate = await this.tagRepository.findOne(id);
    const updated = Object.assign(toUpdate, tagData);
    return await this.tagRepository.save(updated);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tagRepository.delete(id);
  }
}
