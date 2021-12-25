import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from '../layout/layout.component';

@NgModule({
  declarations: [MainViewComponent, LayoutComponent],
  imports: [CommonModule, MaterialModule, RouterModule, LayoutModule],
  exports: [MainViewComponent],
})
export class MainViewModule {}
