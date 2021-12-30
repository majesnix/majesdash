import { Component } from '@angular/core';
import { Tile, UserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { TilesService } from '../tiles/services/tile.service';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userSettings$: Observable<UserSettings | undefined> =
    this.settingsService.userSettings$;
  tiles$: Observable<Tile[]> = this.tilesService.tiles$;

  constructor(
    private settingsService: SettingsService,
    private tilesService: TilesService
  ) {
    this.tilesService.getTiles();
  }
}
