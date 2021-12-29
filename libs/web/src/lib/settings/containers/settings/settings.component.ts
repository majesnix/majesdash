import { Component, OnInit } from '@angular/core';
import {
  Settings,
  SettingsUpdate,
  SystemSettings,
  SystemSettingsUpdate,
  User,
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
  }

  update(settings: SettingsUpdate) {
    this.settingsService.updateUserSettings(settings);
  }

  updateSystemSettings(settings: SystemSettingsUpdate) {
    this.settingsService.updateSystemSettings(settings);
  }
}
