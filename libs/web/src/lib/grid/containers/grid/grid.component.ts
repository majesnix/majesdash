import { Component } from '@angular/core';
import { Tile, UserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { TileService } from '../../../tiles/services/tile.service';

@Component({
  selector: 'majesdash-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  tiles$: Observable<Tile[]> = this.tileService.tiles$;
  userSettings$: Observable<UserSettings | undefined> =
    this.settingsService.userSettings$;

  constructor(
    private settingsService: SettingsService,
    private tileService: TileService
  ) {}
}
