import { Component, OnInit } from '@angular/core';
import { SystemSettings, User, UserSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'majesdash-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  userSettings$: Observable<UserSettings | undefined> =
    this.settingsService.userSettings$;
  systemSettings$: Observable<SystemSettings | undefined> =
    this.settingsService.systemSettings$;
  user$: Observable<User | undefined> = this.userService.user$;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService,
    public window: Window
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.settingsService.getUserSettings();
      this.userService.getUser();
    }
    this.settingsService.getSystemSettings();
  }
}
