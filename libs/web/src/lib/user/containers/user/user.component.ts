import { Component, OnInit } from '@angular/core';
import { User, UserUpdate } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'majesdash-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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
