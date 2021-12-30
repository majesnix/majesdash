import { Component, Input } from '@angular/core';
import { Tile, UserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';

@Component({
  selector: 'majesdash-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() tiles!: Tile[] | null;
  userSettings$: Observable<UserSettings | undefined> =
    this.settingsService.userSettings$;

  constructor(private settingsService: SettingsService) {}

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

    return rowsString;
  }
}
