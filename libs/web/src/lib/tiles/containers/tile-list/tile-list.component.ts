import { Component } from '@angular/core';
import { ITag, ITile, IUser } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TagService } from '../../../tag/services/tag.service';
import { UserService } from '../../../user/services/user.service';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent {
  tiles$: Observable<ITile[]> = this.tileService.tiles$;
  tags$: Observable<ITag[]> = this.tagService.tags$;
  currentUser$: Observable<IUser | undefined> = this.userService.user$;

  displayedColumns = ['title', 'type', 'url', 'icon', 'tag', 'action'];

  constructor(
    private tileService: TileService,
    private tagService: TagService,
    private userService: UserService,
    public window: Window
  ) {
    this.tileService.getTiles({ admin: true });
    this.tagService.getTags();
  }

  getTagName(id: number) {
    return this.tagService.getTagName(id);
  }

  editTile(id: number) {
    this.tileService.selectTile(id);
  }

  delete(id: number) {
    this.tileService.delete(id);
  }
}
