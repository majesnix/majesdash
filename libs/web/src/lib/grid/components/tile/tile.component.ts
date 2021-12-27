import { Component, Input } from '@angular/core';

@Component({
  selector: 'majesdash-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() url!: string;
  @Input() name!: string;
  @Input() type!: string;
  @Input() target = '_blank';
}
