import { Component } from '@angular/core';
import { ISystemSettings, ITile, IUserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { TileService } from '../tiles/services/tile.service';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userSettings$: Observable<IUserSettings> = this.settingsService.userSettings$;
  systemSettings$: Observable<ISystemSettings> =
    this.settingsService.systemSettings$;
  tiles$: Observable<ITile[]> = this.tileService.tiles$;

  constructor(
    private settingsService: SettingsService,
    private tileService: TileService
  ) {}
}
