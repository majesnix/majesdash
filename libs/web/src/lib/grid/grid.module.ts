import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TileModule } from '../tiles/tile.module';
import { GridComponent } from './containers/grid/grid.component';

const config: SocketIoConfig = { url: 'http://localhost:3333', options: {} };

@NgModule({
  declarations: [GridComponent /*SmartTileComponent, SmartTileDirective*/],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SocketIoModule.forRoot(config),
    TileModule,
  ],
  exports: [GridComponent],
})
export class GridModule {}
