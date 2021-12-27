import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GridModule } from '../grid/grid.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    DragDropModule,
    GridModule,
  ],
})
export class DashboardModule {}
