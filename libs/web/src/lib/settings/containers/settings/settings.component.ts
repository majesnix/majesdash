import { Component } from '@angular/core';
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
export class SettingsComponent {
  userSettings$: Observable<UserSettings | undefined> =
    this.settingsService.userSettings$;
  systemSettings$: Observable<SystemSettings | undefined> =
    this.settingsService.systemSettings$;
  user$: Observable<User | undefined> = this.userService.user$;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService
  ) {}

  update(settings: SettingsUpdate) {
    this.settingsService.updateUserSettings(settings);
  }

  updateSystemSettings(settings: SystemSettingsUpdate) {
    this.settingsService.updateSystemSettings(settings);
  }
}
