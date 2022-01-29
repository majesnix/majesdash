import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './containers/user/user.component';
import { UsersComponent } from './containers/users/users.component';
import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';

const userRoutes: Routes = [
  {
    path: 'users',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: UsersComponent },
      {
        path: 'create',
        component: UserComponent,
      },
      {
        path: "edit",
        component: UserEditFormComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UsersComponent,
    UserListComponent,
    UserEditFormComponent,
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PipesModule,
  ],
})
export class UserModule {}
