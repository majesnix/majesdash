import { Component, OnInit } from '@angular/core';
import {
  Settings,
  SettingsUpdate,
  SystemSettings,
  SystemSettingsUpdate,
} from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'majesdash-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;
  systemSettings$!: Observable<SystemSettings | undefined>;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settings$ = this.settingsService.settings$;
    this.systemSettings$ = this.settingsService.systemSettings$;
  }

  update(settings: SettingsUpdate) {
    this.settingsService.updateUserSettings(settings);
  }

  updateSystemSettings(settings: SystemSettingsUpdate) {
    this.settingsService.updateSystemSettings(settings);
  }
}
