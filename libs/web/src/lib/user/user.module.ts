import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './containers/user/user.component';
import { UsersComponent } from './containers/users/users.component';

const userRoutes: Routes = [
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UsersComponent,
    UserListComponent,
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
