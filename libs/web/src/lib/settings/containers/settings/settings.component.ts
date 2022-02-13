import { Component } from '@angular/core';
import {
  IUserSettings,
  IUserSettingsUpdate,
  ISystemSettings,
  ISystemSettingsUpdate,
  IUser,
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
  userSettings$: Observable<IUserSettings | undefined> =
    this.settingsService.userSettings$;
  systemSettings$: Observable<ISystemSettings | undefined> =
    this.settingsService.systemSettings$;
  user$: Observable<IUser | undefined> = this.userService.user$;

  constructor(
    private settingsService: SettingsService,
    private userService: UserService
  ) {}

  update(settings: IUserSettingsUpdate) {
    this.settingsService.updateUserSettings(settings);
  }

  updateSystemSettings(settings: ISystemSettingsUpdate) {
    this.settingsService.updateSystemSettings(settings);
  }
}
