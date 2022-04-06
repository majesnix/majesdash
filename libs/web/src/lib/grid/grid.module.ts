import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TagModule } from '../tag/tag.module';
import { TileModule } from '../tiles/tile.module';
import { GridComponent } from './containers/grid/grid.component';

@NgModule({
  declarations: [GridComponent],
  imports: [CommonModule, FlexLayoutModule, TagModule, TileModule, DragDropModule],
  exports: [GridComponent],
})
export class GridModule {}
