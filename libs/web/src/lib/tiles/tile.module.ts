import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TileFormComponent } from './components/tile-form/tile-form.component';
import { TileComponent } from './containers/tile/tile.component';

@NgModule({
  declarations: [TileFormComponent, TileComponent],
  imports: [CommonModule],
  exports: [TileComponent],
})
export class TileModule {}
