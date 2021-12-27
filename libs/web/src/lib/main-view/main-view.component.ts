import { Component, OnInit } from '@angular/core';
import { Settings, SystemSettings } from '@majesdash/data';
import { Observable } from 'rxjs';
import { SettingsService } from '../settings/services/settings.service';

@Component({
  selector: 'majesdash-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;
  systemSettings$!: Observable<SystemSettings | undefined>;

  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.settings$ = this.settingsService.settings$;
    this.settingsService.getSettings().subscribe();

    this.systemSettings$ = this.settingsService.systemSettings$;
    this.settingsService.getSystemSettings().subscribe();
  }
}
