import { Component } from '@angular/core';
import { Settings, Tile } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { TilesService } from '../grid/services/tiles.service';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  settings$: Observable<Settings | undefined>;
  tiles$: Observable<Tile[]>;

  constructor(
    private settingsService: SettingsService,
    private tilesService: TilesService
  ) {
    this.settings$ = this.settingsService.settings$;
    this.settingsService.getSettings().subscribe();

    this.tiles$ = this.tilesService.tiles$;
    this.tilesService.getTiles().subscribe();
  }
}
