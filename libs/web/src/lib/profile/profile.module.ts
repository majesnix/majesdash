import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileComponent } from './containers/profile/profile.component';

const profileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [ProfileFormComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    MaterialModule,
    PipesModule,
    NgxMatFileInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class ProfileModule {}
