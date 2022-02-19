import { Component } from '@angular/core';
import {
  ISystemSettings,
  ISystemSettingsUpdate,
  IUser,
  IUserSettings,
  IUserSettingsUpdate,
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
  userSettings$: Observable<IUserSettings>;
  systemSettings$: Observable<ISystemSettings>;
  user$: Observable<IUser | undefined> = this.userService.user$;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService
  ) {
    this.userSettings$ = this.settingsService.userSettings$;
    this.systemSettings$ = this.settingsService.systemSettings$;
  }

  update(settings: IUserSettingsUpdate) {
    this.settingsService.updateUserSettings(settings);
  }

  updateSystemSettings(settings: ISystemSettingsUpdate) {
    this.settingsService.updateSystemSettings(settings);
  }
}
