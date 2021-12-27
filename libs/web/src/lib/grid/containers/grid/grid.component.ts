import { Component, Input, OnInit } from '@angular/core';
import { Settings, Tile } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';

@Component({
  selector: 'majesdash-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() tiles!: Tile[] | null;
  settings$!: Observable<Settings | undefined>;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
      this.settings$ = this.settingsService.settings$;
  }

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
