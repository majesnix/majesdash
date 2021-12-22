import { Test } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "./tag.entity";

describe('TagController', () => {
  let tagController: TagController;
  let tagService: TagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity])],
      controllers: [TagController],
      providers: [TagService],
    }).compile();

    tagService = module.get<TagService>(TagService);
    tagController = module.get<TagController>(TagController);
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags : TagEntity[] = [];
      const createTag = (id: number, name: string) => {
        const tag = new TagEntity();
        tag.id = id;
        tag.name = name;
        return tag;
      }
      tags.push(createTag(1, 'angularjs'));
      tags.push(createTag(2, 'reactjs'));

      const findAllResult = await tagController.findAll();
      expect(findAllResult).toBe(tags);
    });
  });
});
