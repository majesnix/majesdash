import { Component } from '@angular/core';
import { ITile, IUser } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/services/user.service';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent {
  tiles$: Observable<ITile[]> = this.tileService.tiles$;
  currentUser$: Observable<IUser | undefined> = this.userService.user$;

  displayedColumns = ['title', 'type', 'url', 'icon', 'action'];

  constructor(
    private tileService: TileService,
    private userService: UserService,
    public window: Window
  ) {}

  editTile(id: number) {
    this.tileService.selectTile(id);
  }

  delete(id: number) {
    this.tileService.delete(id);
  }
}
