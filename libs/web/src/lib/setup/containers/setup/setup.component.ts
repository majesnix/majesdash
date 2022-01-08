import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDto } from '@majesdash/data';
import { SettingsService } from '../../../settings/services/settings.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'majesdash-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetupComponent implements OnInit {
  error = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private settingsService: SettingsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settingsService.getSystemSettings();
  }

  createUser(user: CreateUserDto) {
    this.userService.create(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = true;
        this.cdRef.detectChanges();
      },
    });
  }
}
