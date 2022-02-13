import { Component, OnInit } from '@angular/core';
import { IUserSettings, ISystemSettings, IUser } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { TileService } from '../tiles/services/tile.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'majesdash-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  userSettings$: Observable<IUserSettings | undefined> =
    this.settingsService.userSettings$;
  systemSettings$: Observable<ISystemSettings | undefined> =
    this.settingsService.systemSettings$;
  user$: Observable<IUser | undefined> = this.userService.user$;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService,
    private tileService: TileService,
    public window: Window
  ) {}

  ngOnInit(): void {
    this.settingsService.getSystemSettings();
    this.tileService.getTiles();

    if (localStorage.getItem('token')) {
      this.settingsService.getUserSettings();
      this.userService.getCurrent();
    }
  }
}
