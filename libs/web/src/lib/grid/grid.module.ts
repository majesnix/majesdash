import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './components/tile/tile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridComponent } from './containers/grid/grid.component';

@NgModule({
  declarations: [TileComponent, GridComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [GridComponent],
})
export class GridModule {}
