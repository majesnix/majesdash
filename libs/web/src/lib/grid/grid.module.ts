import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TileModule } from '../tiles/tile.module';
import { GridComponent } from './containers/grid/grid.component';

@NgModule({
  declarations: [GridComponent /*SmartTileComponent, SmartTileDirective*/],
  imports: [CommonModule, FlexLayoutModule, TileModule],
  exports: [GridComponent],
})
export class GridModule {}
