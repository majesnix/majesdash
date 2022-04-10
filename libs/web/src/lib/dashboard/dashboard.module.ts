import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridModule } from '../grid/grid.module';
import { MaterialModule } from '../material/material.module';
import { WeatherModule } from '../weather/weather.module';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    CommonModule,
    MaterialModule,
    RouterModule,
    GridModule,
    WeatherModule,
  ],
})
export class DashboardModule {}
