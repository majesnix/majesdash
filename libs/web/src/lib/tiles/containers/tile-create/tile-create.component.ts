import { Component } from '@angular/core';
import { ITile } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-create',
  templateUrl: './tile-create.component.html',
  styleUrls: ['./tile-create.component.scss'],
})
export class TileCreateComponent {
  selectedTile$: Observable<ITile | undefined> = this.tileService.selectedTile$;

  constructor(private tileService: TileService) {}

  addTile(tile: Omit<ITile, 'id'>) {
    this.tileService.addTile(tile);
  }

  updateTile(tile: ITile) {
    this.tileService.updateTile(tile);
  }
}
