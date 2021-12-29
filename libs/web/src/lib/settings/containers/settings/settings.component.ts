import { Component, OnInit } from '@angular/core';
import {
  SettingsUpdate,
  SystemSettings,
  SystemSettingsUpdate,
  User,
  UserSettings,
} from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/services/user.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'majesdash-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
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
  }

  update(settings: SettingsUpdate) {
    this.settingsService.updateUserSettings(settings);
  }

  updateSystemSettings(settings: SystemSettingsUpdate) {
    this.settingsService.updateSystemSettings(settings);
  }
}
