import { Component } from '@angular/core';
import { ITag } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'majesdash-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.scss'],
})
export class TagCreateComponent {
  selectedTag$: Observable<ITag | undefined> = this.tagService.selectedTag$;

  constructor(private tagService: TagService) {}

  addTag(tag: Omit<ITag, 'id'>) {
    this.tagService.addTag(tag);
  }

  updateTag(tag: ITag) {
    this.tagService.updateTag(tag);
  }
}
