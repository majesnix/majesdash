import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { JsonEditorComponent } from './containers/json-editor/json-editor.component';

@NgModule({
  declarations: [JsonEditorComponent],
  imports: [CommonModule, MaterialModule],
  exports: [JsonEditorComponent],
})
export class JsonEditorModule {}
