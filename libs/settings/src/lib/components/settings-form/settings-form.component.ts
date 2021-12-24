import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsUpdate } from '@majesdash/data-models';

@Component({
  selector: 'majesdash-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent {
  @Output() settingsUpdateEvent = new EventEmitter<SettingsUpdate>();

  settingsForm = new FormGroup({
    background: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
  });

  update() {
    this.settingsUpdateEvent.emit({
      file: this.settingsForm.value.background,
    });
  }
}
