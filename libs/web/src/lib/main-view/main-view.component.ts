import { Component, OnInit } from '@angular/core';
import { Settings, SystemSettings, User } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'majesdash-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;
  systemSettings$!: Observable<SystemSettings | undefined>;
  user$!: Observable<User | undefined>;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.settings$ = this.settingsService.settings$;
    this.systemSettings$ = this.settingsService.systemSettings$;
    this.user$ = this.userService.user$;

    if (localStorage.getItem('token')) {
      this.settingsService.getUserSettings();
      this.userService.getUser();
    }
    this.settingsService.getSystemSettings();
  }
}
