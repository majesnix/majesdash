import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from '@majesdash/data';
import { TileService } from '../../services/tile.service';

@Component({
  selector: 'majesdash-tile-create',
  templateUrl: './tile-create.component.html',
  styleUrls: ['./tile-create.component.scss'],
})
export class TileCreateComponent {
  constructor(private tileService: TileService, private router: Router) {}

  addTile(tile: Partial<Tile>) {
    this.tileService.addTile(tile);
    this.router.navigate(['/']);
  }
}
