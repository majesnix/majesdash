import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { SetupFormComponent } from './components/setup-form/setup-form.component';
import { SetupComponent } from './containers/setup/setup.component';

export const setupRoutes: Route[] = [
  {
    path: 'setup',
    component: SetupComponent,
  },
];

@NgModule({
  declarations: [SetupComponent, SetupFormComponent],
  imports: [
    RouterModule.forChild(setupRoutes),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PipesModule,
  ],
})
export class SetupModule {}
