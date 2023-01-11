/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISystemSettings, ISystemSettingsUpdate } from '@majesdash/data';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'majesdash-system-settings-form',
  templateUrl: './system-settings-form.component.html',
  styleUrls: ['./system-settings-form.component.scss'],
})
export class SystemSettingsFormComponent implements OnInit {
  @Input() systemSettings!: ISystemSettings;
  @Output()
  systemSettingsUpdateEvent = new EventEmitter<ISystemSettingsUpdate>();

  systemSettingsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.systemSettingsForm = this.fb.group({
      background: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      weatherWidget: this.systemSettings.weatherWidget,
      weatherWidgetApiKey: this.systemSettings.weatherWidgetApiKey,
      weatherWidgetTown: this.systemSettings.weatherWidgetTown,
    });
  }

  update() {
    this.systemSettingsUpdateEvent.emit({
      background: this.systemSettingsForm.value.background,
      weatherWidget: this.systemSettingsForm.value.weatherWidget,
      weatherWidgetApiKey: this.systemSettingsForm.value.weatherWidgetApiKey,
      weatherWidgetTown: this.systemSettingsForm.value.weatherWidgetTown,
    });
  }
}
