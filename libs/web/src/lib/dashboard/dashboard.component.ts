import { Component } from '@angular/core';
import { ITile, IUserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { TileService } from '../tiles/services/tile.service';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userSettings$: Observable<IUserSettings | undefined> =
    this.settingsService.userSettings$;
  tiles$: Observable<ITile[]> = this.tileService.tiles$;

  constructor(
    private settingsService: SettingsService,
    private tileService: TileService
  ) {}
}
