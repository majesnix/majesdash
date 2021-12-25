import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsUpdate } from '@majesdash/data';

interface TabOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'majesdash-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent {
  @Output() settingsUpdateEvent = new EventEmitter<SettingsUpdate>();

  tabOptions: TabOptions[] = [
    { value: '0', viewValue: 'New Tab' },
    { value: '1', viewValue: 'Same Tab' },
  ];

  settingsForm = new FormGroup({
    background: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
    tabOption: new FormControl('0', {
      validators: [],
    }),
  });

  changeTabOption(id: string) {
    this.settingsForm.get('tabOption')?.setValue(id);
  }

  update() {
    this.settingsUpdateEvent.emit({
      background: this.settingsForm.value.background,
      settings: {
        tabTarget: this.settingsForm.value.tabOption,
      },
    });
  }
}
