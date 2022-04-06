import { Component } from '@angular/core';
import { ITag, IUser } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/services/user.service';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'majesdash-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {
  tags$: Observable<ITag[]> = this.tagService.tags$;
  currentUser$: Observable<IUser | undefined> = this.userService.user$;

  displayedColumns = ['title', 'icon', 'action'];

  constructor(
    private tagService: TagService,
    private userService: UserService,
    public window: Window
  ) {
    this.tagService.getTags();
  }

  editTag(id: number) {
    this.tagService.selectTag(id);
  }

  delete(id: number) {
    this.tagService.delete(id);
  }
}
