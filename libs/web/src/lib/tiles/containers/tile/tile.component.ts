import { Component, Input } from '@angular/core';

@Component({
  selector: 'majesdash-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  constructor(public window: Window) {}
  @Input() url!: string;
  @Input() title!: string;
  @Input() type!: string;
  @Input() target = '_blank';
  @Input() icon?: string;
}
