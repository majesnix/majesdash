import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [MainViewComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MainViewComponent],
})
export class MainViewModule {}
