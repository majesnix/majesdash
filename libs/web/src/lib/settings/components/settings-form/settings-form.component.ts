import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUserSettingsUpdate } from '@majesdash/data';
import { MaxSizeValidator } from '@angular-material-components/file-input';

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
  @Output() settingsUpdateEvent = new EventEmitter<IUserSettingsUpdate>();

  tabOptions: TabOptions[] = [
    { value: '_blank', viewValue: 'New Tab' },
    { value: '_self', viewValue: 'Same Tab' },
  ];

  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      background: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
      tabOption: '_blank',
    });
  }

  changeTabOption(value: string) {
    this.settingsForm.get('tabOption')?.setValue(value);
  }

  update() {
    this.settingsUpdateEvent.emit({
      background: this.settingsForm.value.background,
      tabTarget: this.settingsForm.value.tabOption,
    });
  }
}
