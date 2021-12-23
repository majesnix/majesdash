import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    DashboardComponent
  ],
})
export class DashboardModule {}
