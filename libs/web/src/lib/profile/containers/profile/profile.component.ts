import { Component, OnInit } from '@angular/core';
import { User, UserUpdate } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'majesdash-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User | undefined> = this.userService.user$;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.getCurrent();
    }
  }

  update(user: UserUpdate) {
    this.userService.updateCurrent(user);
  }
}
