import { MaxSizeValidator } from '@angular-material-components/file-input';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SettingsUpdate } from '@majesdash/data-models';

@Component({
  selector: 'majesdash-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
})
export class SettingsFormComponent implements OnInit {
  @Output() settingsUpdateEvent = new EventEmitter<SettingsUpdate>();

  settingsForm = new FormGroup({
    background: new FormControl(undefined, {
      validators: [MaxSizeValidator(16 * 1024)],
    }),
  });

  ngOnInit(): void {
    this.settingsForm.controls['background'].valueChanges.subscribe((files) => {
      console.log('FILES', files);
    });
  }

  update() {
    console.log('FILE', this.settingsForm.get('background')?.value);
    this.settingsUpdateEvent.emit({
      file: this.settingsForm.value.background,
    });
  }
}
