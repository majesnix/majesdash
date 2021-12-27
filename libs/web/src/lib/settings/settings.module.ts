import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SystemInfoComponent } from './components/system-info/system-info.component';
import { MaterialModule } from '../material/material.module';
import { SettingsComponent } from './containers/settings/settings.component';
import { SystemSettingsFormComponent } from './components/system-settings-form/system-settings-form.component';
import { PipesModule } from '../pipes/pipes.module';

export const settingRoutes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PipesModule
  ],
  declarations: [
    SettingsFormComponent,
    SettingsComponent,
    SystemInfoComponent,
    SystemSettingsFormComponent,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
