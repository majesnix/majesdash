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
  user$!: Observable<User | undefined>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.user$;
    if (localStorage.getItem('token')) {
      this.userService.getUser().subscribe();
    }
  }

  update(user: UserUpdate) {
    this.userService.updateUser(user).subscribe();
  }
}
