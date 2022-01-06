import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/containers/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { JsonEditorModule } from './json-editor/json-editor.module';
import { MainViewComponent } from './main-view/main-view.component';
import { MainViewModule } from './main-view/main-view.module';
import { SettingsComponent } from './settings/containers/settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { TileModule } from './tiles/tile.module';
import { UserComponent } from './user/containers/user/user.component';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsModule,
    AuthModule,
    LayoutModule,
    DashboardModule,
    MainViewModule,
    UserModule,
    TileModule,
    JsonEditorModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: DashboardComponent,
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'settings',
          component: SettingsComponent,
        },
        {
          path: 'user',
          component: UserComponent,
        },
      ],
      {
        scrollPositionRestoration: 'top',
        initialNavigation: 'enabledBlocking',
      }
    ),
  ],
  declarations: [
  ],
  exports: [MainViewComponent],
})
export class WebModule {}
