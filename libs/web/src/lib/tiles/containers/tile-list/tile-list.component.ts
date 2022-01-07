import { Component } from '@angular/core';
import { Tile } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-list',
  templateUrl: './tile-list.component.html',
  styleUrls: ['./tile-list.component.scss'],
})
export class TileListComponent {
  tiles$: Observable<Tile[]> = this.tileService.tiles$;

  constructor(private tileService: TileService) {}
}
