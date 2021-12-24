import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Settings, SettingsUpdate } from '@majesdash/data-models';
import { Observable } from 'rxjs';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'majesdash-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings$!: Observable<Settings | undefined>;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe();
    this.settings$ = this.settingsService.settings$;
    this.settings$.subscribe((data) => {
      console.log('data in sub', data);
    });
  }

  update(settings: SettingsUpdate) {
    this.settingsService.updateSettings(settings).subscribe((data) => {
      console.log('data in update', data);
    });
  }
}
