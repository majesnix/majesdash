import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SystemSettingsUpdate } from '@majesdash/data';

@Component({
  selector: 'majesdash-system-settings-form',
  templateUrl: './system-settings-form.component.html',
  styleUrls: ['./system-settings-form.component.scss'],
})
export class SystemSettingsFormComponent {
  @Output() systemSettingsUpdateEvent =
    new EventEmitter<SystemSettingsUpdate>();

  systemSettingsForm = new FormGroup({
    background: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
  });

  update() {
    this.systemSettingsUpdateEvent.emit({
      background: this.systemSettingsForm.value.background,
    });
  }
}
