import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NgxMatFileInputModule } from '@majesnix/file-input';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { SystemInfoComponent } from './components/system-info/system-info.component';
import { SystemSettingsFormComponent } from './components/system-settings-form/system-settings-form.component';
import { SettingsComponent } from './containers/settings/settings.component';

const settingRoutes: Route[] = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(settingRoutes),
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    PipesModule,
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
