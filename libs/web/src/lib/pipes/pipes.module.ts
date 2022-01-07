import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ByteFormatPipe } from './byteFormat.pipe';

@NgModule({
  declarations: [ByteFormatPipe],
  imports: [CommonModule],
  exports: [ByteFormatPipe],
})
export class PipesModule {}
