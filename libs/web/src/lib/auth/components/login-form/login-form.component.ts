import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthenticate } from '@majesdash/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'majesdash-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() authenticateEvent = new EventEmitter<IAuthenticate>();
  @Input() hasError!: boolean;
  @Output() hasErrorChange = new EventEmitter<boolean>();
  @ViewChild('username') usernameInputField!: ElementRef;
  hide = true;

  loginForm: FormGroup;
  loginFormSubscription: Subscription | undefined;

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loginFormSubscription = this.loginForm.valueChanges.subscribe(() => {
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
      });
    }
  }

  ngOnDestroy(): void {
    this.loginFormSubscription?.unsubscribe();
  }
}
