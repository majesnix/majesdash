import { Component, Input } from '@angular/core';
import { Tile } from '@majesdash/data';

@Component({
  selector: 'majesdash-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() tiles!: Tile[] | null;

  generateAreas() {
    const rows = this.tiles?.length ? Math.ceil(this.tiles.length / 4) : 1;
    let count = 1;
    let rowsString = '';
    while (count <= rows) {
      if (count === rows) {
        rowsString += `area${count}`;
      } else {
        rowsString += `area${count} | `;
      }
      count++;
    }
    console.log('string', rowsString);

    return rowsString;
  }
}
