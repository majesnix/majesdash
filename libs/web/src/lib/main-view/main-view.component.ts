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
  userSettings$!: Observable<UserSettings | undefined>;
  systemSettings$!: Observable<SystemSettings | undefined>;
  user$!: Observable<User | undefined>;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSettings$ = this.settingsService.userSettings$;
    this.systemSettings$ = this.settingsService.systemSettings$;
    this.user$ = this.userService.user$;

    if (localStorage.getItem('token')) {
      this.settingsService.getUserSettings();
      this.userService.getUser();
    }
    this.settingsService.getSystemSettings();
  }
}
