import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ICreateUserDto } from '@majesdash/data';
import { first, Subscription } from 'rxjs';
import { SettingsService } from '../../../settings/services/settings.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'majesdash-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupComponent implements OnInit, OnDestroy {
  error = false;

  userServiceSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private settingsService: SettingsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settingsService.getSystemSettings();
  }

  createUser(user: ICreateUserDto) {
    this.userServiceSubscription = this.userService
      .create(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error = true;
          this.cdRef.detectChanges();
        },
      });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription?.unsubscribe();
  }
}
