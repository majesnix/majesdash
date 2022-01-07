import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [],
})
export class HeaderModule {}
