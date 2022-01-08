import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '@majesdash/data';

@Component({
  selector: 'majesdash-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.scss'],
})
export class SetupFormComponent implements OnInit {
  @Output() setupEvent = new EventEmitter<CreateUserDto>();
  @Input() hasError!: boolean;
  @Output() hasErrorChange = new EventEmitter<boolean>();
  hide = true;

  setupForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    passwordRepeat: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.setupForm.valueChanges.subscribe(() => {
      if (this.hasError) {
        this.hasErrorChange.emit(false);
      }
    });
  }

  @HostListener('document:keydown.enter') setup() {
    if (this.setupForm.valid) {
      this.setupEvent.emit({
        username: this.setupForm.value.username,
        email: this.setupForm.value.email,
        password: this.setupForm.value.password,
        passwordRepeat: this.setupForm.value.passwordRepeat,
      } as CreateUserDto);
    }
  }
}
