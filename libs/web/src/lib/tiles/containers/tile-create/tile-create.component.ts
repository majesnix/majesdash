import { Component } from '@angular/core';
import { CreateTileDto, Tile } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-create',
  templateUrl: './tile-create.component.html',
  styleUrls: ['./tile-create.component.scss'],
})
export class TileCreateComponent {
  selectedTile$: Observable<Tile | undefined> = this.tileService.selectedTile$;

  constructor(private tileService: TileService) {}

  addTile(tile: Partial<CreateTileDto>) {
    this.tileService.addTile(tile);
  }

  updateTile(tile: Partial<Tile>) {
    this.tileService.updateTile(tile);
  }
}
