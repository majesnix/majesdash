import { Component } from '@angular/core';
import { Tile, UserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { TilesService } from '../grid/services/tiles.service';
import { SettingsService } from '../settings/services/settings.service';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userSettings$: Observable<UserSettings | undefined>;
  tiles$: Observable<Tile[]>;

  constructor(
    private settingsService: SettingsService,
    private tilesService: TilesService
  ) {
    this.userSettings$ = this.settingsService.userSettings$;

    this.tiles$ = this.tilesService.tiles$;
    this.tilesService.getTiles();
  }
}
