import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from '@majesdash/data';

@Component({
  selector: 'majesdash-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.scss'],
})
export class SetupFormComponent implements AfterViewInit {
  @Output() setupEvent = new EventEmitter<CreateUserDto>();
  @Input() hasError!: boolean;
  @ViewChild('username') usernameInputField!: ElementRef;
  hide = true;
  setupForm: FormGroup;

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.setupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.usernameInputField.nativeElement.focus();
    this.cdRef.detectChanges();
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
