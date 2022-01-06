import { Component, OnInit } from '@angular/core';
import { Tile, UserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { TileService } from '../tiles/services/tile.service';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userSettings$: Observable<UserSettings | undefined> =
    this.settingsService.userSettings$;
  tiles$: Observable<Tile[]> = this.tileService.tiles$;

  constructor(
    private settingsService: SettingsService,
    private tileService: TileService
  ) {}

  ngOnInit(): void {
    this.tileService.getTiles();
  }
}
