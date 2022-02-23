import { Component } from '@angular/core';
import { ITile, IUserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { TileService } from '../../../tiles/services/tile.service';

@Component({
  selector: 'majesdash-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  tiles$: Observable<ITile[]> = this.tileService.tiles$;
  userSettings$: Observable<IUserSettings> = this.settingsService.userSettings$;

  constructor(
    private settingsService: SettingsService,
    private tileService: TileService
  ) {}
}
