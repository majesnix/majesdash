import { Component, OnInit } from '@angular/core';
import { Settings } from '@majesdash/data';
import { SettingsService } from '@majesdash/settings';
import { Observable } from 'rxjs';

@Component({
  selector: 'majesdash-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe();
    this.settings$ = this.settingsService.settings$;
    this.settings$.subscribe();
  }
}
