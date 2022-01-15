import { Component, OnInit } from '@angular/core';
import { User } from '@majesdash/data';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'majesdash-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  currentUser$: Observable<User | undefined> = this.userService.user$;
  users$: Observable<User[] | []> = this.userService.users$;

  displayedColumns: string[] = ['username', 'email', 'isAdmin', 'action'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.userService.getAll();
    }
  }

  editUser(id: number) {
    this.userService.selectUser(id);
  }

  deleteUser(id: number) {
    this.userService.delete(id);
  }
}
