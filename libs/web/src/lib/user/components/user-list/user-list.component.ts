import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '@majesdash/data';

@Component({
  selector: 'majesdash-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() currentUser!: IUser;
  @Input() users!: IUser[];
  @Output() userSelectEvent = new EventEmitter<number>();
  @Output() userDeleteEvent = new EventEmitter<number>();

  displayedColumns: string[] = ['username', 'email', 'isAdmin', 'action'];

  editUser(id: number) {
    this.userSelectEvent.emit(id);
  }

  deleteUser(id: number) {
    this.userDeleteEvent.emit(id);
  }
}
