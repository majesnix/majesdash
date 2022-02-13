import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ISystemSettingsUpdate } from '@majesdash/data';

@Component({
  selector: 'majesdash-system-settings-form',
  templateUrl: './system-settings-form.component.html',
  styleUrls: ['./system-settings-form.component.scss'],
})
export class SystemSettingsFormComponent {
  @Output() systemSettingsUpdateEvent =
    new EventEmitter<ISystemSettingsUpdate>();

  systemSettingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.systemSettingsForm = this.fb.group({
      background: [undefined, [MaxSizeValidator(16 * 2 ** 20)]],
    });
  }

  update() {
    this.systemSettingsUpdateEvent.emit({
      background: this.systemSettingsForm.value.background,
    });
  }
}
