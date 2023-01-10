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

  async findAll(loggedIn: boolean): Promise<TagEntity[]> {
    if (loggedIn) {
      return await this.tagRepository.find();
    } else {
      return await this.tagRepository.find({ where: { hidden: false } });
    }
  }

  async findOne(id: string): Promise<TagEntity> {
    return await this.tagRepository.findOne({
      where: { id: parseInt(id) },
    });
  }

  async create(tagDto: TagDto, filename?: string): Promise<TagEntity> {
    const tag = new TagEntity();
    tag.name = tagDto.name;
    tag.icon = filename;
    tag.color = tagDto.color;
    tag.order = tagDto.order;
    tag.hidden = tagDto.hidden === 'true';

    return await this.tagRepository.save(tag);
  }

  async update(id: number, tagDto: TagDto): Promise<TagEntity> {
    const toUpdate = await this.tagRepository.findOne({ where: { id } });

    toUpdate.name = tagDto.name ? tagDto.name : toUpdate.name;
    toUpdate.color = tagDto.color ? tagDto.color : toUpdate.color;
    toUpdate.hidden = tagDto.hidden
      ? tagDto.hidden === 'true'
      : toUpdate.hidden;
    toUpdate.icon = tagDto.icon ? tagDto.icon : toUpdate.icon;
    toUpdate.order = tagDto.order ? tagDto.order : toUpdate.order;

    return await this.tagRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.tagRepository.delete(id);
  }
}
