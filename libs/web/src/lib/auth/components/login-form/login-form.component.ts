import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '@majesdash/data';

@Component({
  selector: 'majesdash-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  @Output() authenticateEvent = new EventEmitter<Authenticate>();
  @Input() hasError!: boolean;
  @Output() hasErrorChange = new EventEmitter<boolean>();
  @ViewChild('username') usernameInputField!: ElementRef;
  hide = true;

  loginForm = new FormGroup({
    emailOrUsername: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
  });

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.hasError) {
        this.hasErrorChange.emit(false);
      }
    });
  }

  ngAfterViewInit() {
    this.usernameInputField.nativeElement.focus();
    this.cdRef.detectChanges();
  }

  @HostListener('document:keydown.enter') login() {
    if (this.loginForm.valid) {
      this.authenticateEvent.emit({
        emailOrUsername: this.loginForm.value.emailOrUsername,
        password: this.loginForm.value.password,
      } as Authenticate);
    }
  }
}
