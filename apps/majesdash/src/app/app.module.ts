import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthModule, authRoutes } from '@majesdash/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dashboardRoutes } from '@majesdash/dashboard';
import { LayoutModule } from '@majesdash/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', children: dashboardRoutes },
        { path: 'auth', children: authRoutes },
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
    AuthModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
