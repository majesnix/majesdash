import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    { value: '_blank', viewValue: 'New Tab' },
    { value: '_self', viewValue: 'Same Tab' },
  ];

  settingsForm = new FormGroup({
    background: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
    tabOption: new FormControl('_blank', {
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
