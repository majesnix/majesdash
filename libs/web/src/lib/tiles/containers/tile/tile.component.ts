import { Component, Input } from '@angular/core';
import { ITile } from '@majesdash/data';

@Component({
  selector: 'majesdash-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  constructor(public window: Window) {}
  @Input() target = '_blank';
  @Input() tile!: ITile;
}
