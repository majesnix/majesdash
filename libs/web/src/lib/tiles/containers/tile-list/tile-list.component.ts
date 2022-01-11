import { Component } from '@angular/core';
import { Tile, User } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/services/user.service';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent {
  tiles$: Observable<Tile[]> = this.tileService.tiles$;
  currentUser$: Observable<User | undefined> = this.userService.user$;

  constructor(
    private tileService: TileService,
    private userService: UserService
  ) {}

  selectTile(id: number) {
    this.tileService.selectTile(id);
  }

  deselectTile() {
    this.tileService.deselectTile();
  }

  delete(id: number) {
    this.tileService.delete(id);
  }
}
