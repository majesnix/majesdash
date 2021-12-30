import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MaterialModule } from '../material/material.module';
import { MainViewComponent } from './main-view.component';

@NgModule({
  declarations: [MainViewComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MainViewComponent],
})
export class MainViewModule {}
