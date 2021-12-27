import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './containers/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [UserComponent, UserFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PipesModule
  ],
})
export class UserModule {}
