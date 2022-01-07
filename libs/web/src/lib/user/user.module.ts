import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './containers/user/user.component';

@NgModule({
  declarations: [UserComponent, UserFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PipesModule,
  ],
})
export class UserModule {}
