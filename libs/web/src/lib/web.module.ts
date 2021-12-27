import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsModule } from './settings/settings.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './auth/containers/login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsComponent } from './settings/containers/settings/settings.component';
import { MainViewModule } from './main-view/main-view.module';
import { MainViewComponent } from './main-view/main-view.component';
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
  declarations: [],
  exports: [MainViewComponent],
})
export class WebModule {}
